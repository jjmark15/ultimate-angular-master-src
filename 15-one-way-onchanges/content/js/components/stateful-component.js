var statefulComponent = {
	template: `
		<div>
			<pre>{{ $ctrl.user | json }}</pre>
			<stateless-component
				user="$ctrl.user"
				on-update="$ctrl.updateUser($event);"> // on-update is being defined as a function that takes an event
			</stateless-component>
		</div>
	`,
	controller: function () {
		this.user = { // controller giving data, hence stateful component
			name: 'Todd Motto',
			location: 'England, UK'
		};
		this.updateUser = function (event) {
			console.log(1)
			this.user = event.user;
		};
	}
};

angular
	.module('app')
	.component('statefulComponent', statefulComponent);
