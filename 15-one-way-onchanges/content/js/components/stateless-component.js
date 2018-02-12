var statelessComponent = {
	bindings: {
		user: '<',
		onUpdate: '&' // aliasing the onUpdate function defined in stateful template
	},
	controller: function () {
		this.$onChanges = function (changes) {
			console.log('changes')
			if (changes.user) {
				console.log('user changes')
				this.user = angular.copy(this.user);
			}
		};
		this.updateUser = function () { // function called on ng-click
			console.log('returning event')
			this.onUpdate({ // calling onUpdate function passing $event conatining mutated (and copied) this.user
				$event: {
					user: this.user
				}
			});
		};
	},
	template: `
		<div>
			<input type="text" ng-model="$ctrl.user.name">
			<input type="text" ng-model="$ctrl.user.location">
			<a href="" ng-click="$ctrl.updateUser();">Update</a>
		</div>
	`
};

angular
	.module('app')
	.component('statelessComponent', statelessComponent);
