function DatePicker($timeout, PikadayService) {
	return {
		scope: {
			date: '=' // two-way data binding from here to ctrl.date in the date-picker element
		},
		template: `
			<div>
				Isolate date: {{ date | date: 'MMM d, yyyy' }}
				<input type="text">
			</div>
		`,
		link: function ($scope, $element, $attrs) { // $scope etc are properties of the html element
			var field = $element[0].querySelector('input');
			var picker = PikadayService({
				field: field, // telling pickaday which field to bind to, he's helpfully called this `field`
				onSelect: function (date) { // callback function called when we select a date
					$timeout(function () { // built-in angular wrapper for setTimeout, pushes this event to the back of the call-stack
						$scope.date = date; // set the $scope.date equal to what the date picker has returned
						// $timeout triggers a 'digest' which you can think of as a 'safe apply'
						// an apply tells angular to re-evaluate so that if a change occurs outside of the angular system, it will then recognise those changes
						// here we are sending a config containing functions blah blah to the PikadayService which updates the $scope.date value
						// we are telling angular to check for changes to reflect this change
					});
				}
			});
			picker.setDate($scope.date); // setting an initial value, since we're already binding to $scope, easy to just set it as $scope.date
		}
	}
}

angular
	.module('app')
	.directive('datePicker', DatePicker);
