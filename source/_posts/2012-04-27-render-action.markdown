---
layout: post
title: "Render Action"
date: 2012-04-27 14:21
comments: true
categories: [asp.net mvc, web]
---

It's common for a single web page to include data from many sources. Consider this screen shot from [Project Silk](http://silk.codeplex.com/). There are four separate items displayed.

{% img right /images/posts/many-concerns.png %}

The primary concern of the page is displaying a list of vehicles. However it also displays some statistics and a set of reminders. I labeled the stats and reminders as orthogonal because they are (in a sense) independent of the primary concern. Finally, there is the ambient data of the currently logged in user. I call this data ambient because we expect it to be present on all the pages in the application.

It's a common practice in MVC-style applications to map a single controller action to a view. That is, it is the responsibility of a single action to produce everything that is needed to render a particular web page. 

The difficulty with this approach is that _other pages_ often need to render the same orthogonal data. Let's examine the code for the action invoked by `\vehicle\list`.

    public ActionResult List()
    {
        AddCountryListToViewBag();

        var vehicles = Using<GetVehicleListForUser>()
            .Execute(CurrentUserId);

        var imminentReminders = Using<GetImminentRemindersForUser>()
            .Execute(CurrentUserId, DateTime.UtcNow);

        var statistics = Using<GetFleetSummaryStatistics>()
            .Execute(CurrentUserId);

        var model = new DashboardViewModel
                        {
                            User = CurrentUser,
                            VehicleListViewModel = new VehicleListViewModel(vehicles),
                            ImminentReminders = imminentReminders,
                            FleetSummaryStatistics = statistics
                        };

        return View(model);
    }

Disregarding how you might feel about the `Using<T>` method to invoke commands and other such details, I want you to focus on the fact that the controller is _composing_ a model. We generate a number of smaller viewmodels and then compose them into an instance of `DashboardViewModel`. The class `DashboardViewModel` only exists to tie together the four, otherwise independent data.

<aside>

Personally, I prefer to avoid classes like `DashboardViewModel` and simply rely on dynamic typing in the view. However, others feel strongly about having IntelliSense support in the view.

</aside>

Project Silk had separate actions just to serve up JSON:

	public JsonResult JsonList()
        {
            var list = Using<GetVehicleListForUser>()
                .Execute(CurrentUserId)
                .Select(x => ToJsonVehicleViewModel(x))
                .ToList();

            return Json(list);
        }

You'll notice that both `JsonList` and `List` use the same `GetVehicleListForUser` command for retrieving their data. `JsonList` also projected the data to a slightly different viewmodel.

## Reducing the Code

While reevaluating this code for [Project Liike](https://github.com/liike/), we decided to employ [content negotiation](http://en.wikipedia.org/wiki/Content_negotiation). That is, we wanted a single endpoint, such as `\vehicle\list`, to return different representations of the data based upon a requested format. If the browser requested JSON, then `\vehicle\list` should return a list of the vehicles in JSON. If the browser requested markup, then the same endpoint should return HTML. 

First, we needed to eliminate the differences between the JSON viewmodel and the HTML viewmodel. Without going deep into details, this wasn't hard to do. In fact, it revealed that we had some presentation logic in the view that should not have been there. The real problem was that I wanted the action to look more like this:

    public ActionResult List()
    {
        var vehicles = Using<GetVehicleListForUser>()
            .Execute(CurrentUserId);

        return new ContentTypeAwareResult(vehicles);
    }

Only, the view still needed the additional data of statistics and reminders. How should the view get it? 

We decided to use [RenderAction](http://msdn.microsoft.com/en-us/library/system.web.mvc.html.childactionextensions.renderaction.aspx). RenderAction allows a view to invoke another action and render the results into the current view. 

We needed to break out the other concerns into their own actions. For the sake of example, we'll assume they are both on the `VehicleController` and named `Reminders` and `Statistics`. Each of these action would be responsible for getting a focused set of data. Then in the (imaginary) view for `List` we could invoke the actions like so:

	// List.cshtml 
	<ul>
	@foreach (var vehicle in Model)
	{
		<li>@vehicle.Name</li>
	}
	</ul>

	<section role="reminders">
	@{ Html.RenderAction( "Reminders", "Vehicle") }
	</section>

	<section role="statistics">
	@{ Html.RenderAction( "Statistics", "Vehicle") }
	</section>

<aside>

Note that each action has it's on associated view.

</aside>

The value of using RenderAction is that we where able to create very simple actions on our controllers. We were also able to reuse the actions for rendering both markup and JSON.

A secondary benefit is the separation of concerns. For example, because we moved the responsibility of composition from the controller into the view, a designer could now revise the view for the `\vehicle\list` without needing to touch the code. They could remove any of the orthogonal concerns or even add new ones without introducing any breaking changes.

## The Downside

There are a few caveats with this approach.

First, don't confuse RenderAction with [RenderPartial](http://msdn.microsoft.com/en-us/library/system.web.mvc.html.renderpartialextensions.renderpartial.aspx). RenderAction is for invoking a completely independent action, with its own view and model. RenderPartial is simply for renders a view based on a model passed to it (generally derived from the main viewmodel).

Secondly, avoid using RenderAction to render a form. It's likely won't work the way you'd expect.This means that any form rendering will need to occur in your primary view.

Thirdly, using RenderAction breaks the [model-view-controller](http://en.wikipedia.org/wiki/Model-view-controller#Overview) pattern. What I mean is that, in MVC, it's assumed that the view does nothing more than render a model. Controllers invoke a view, and not vice versa. Using RenderAction breaks this rule. Personally, I have no problem breaking the rule when it results in code that is more simple and more easily maintained. Isn't that the whole [point of best practices](/blog/2008/03/30/the-roots-of-best-practices/) anyway? 