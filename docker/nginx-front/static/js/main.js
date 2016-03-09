

var CommentBox = React.createClass({
	  displayName: "CommentBox",

	  render: function render() {
	    return React.createElement("div",{ className: "commentBox" },React.createElement("h1",null,"Comments"),
	      React.createElement(CommentList, { data: this.props.data }),
	      React.createElement(CommentForm, null)
	    );
	  }
	});

var CommentList = React.createClass({
	  displayName: "CommentList",

	  render: function render() {
	    var commentNodes = this.props.data.map(function (comment) {
	      return React.createElement(Comment,{ author: comment.author },comment.text);
	    });
	    return React.createElement("div",{ className: "commentList" },commentNodes);
	  }
	});

var CommentForm = React.createClass({
	  displayName: "CommentForm",
	  render: function render() {return React.createElement( "div",{ className: "commentForm" },"Hello, world! I am a CommentForm.");}
	});

	
var Comment = React.createClass({
	  displayName: "Comment",
	  render: function render() {
	    return React.createElement("div",{ className: "comment" },
	      React.createElement("h2",{ className: "commentAuthor" }, this.props.author),this.props.children);
	  }
	});

	
var data = [{ author: "Peter Hunt", text: "This is one comment" }, { author: "Jordan Walke", text: "This is *another* comment" }];

var NavBar = React.createClass({
	  displayName: "NavBar",
	  render: function render() {
	    return React.createElement("div",{ className: "container-fluid" },
					React.createElement("div",{ className: "navbar-header" },
						React.createElement("a",{ className: "navbar-brand", href: "#" },"Silver Pulse")
					),
					React.createElement("div",{ id: "navbar", className: "navbar-collapse collapse" },
						React.createElement("ul",{ className: "nav navbar-nav navbar-right" },
							React.createElement("li", null,
								React.createElement("a",{ href: "#" }, "Dashboard")
							),
							React.createElement("li", null,
								React.createElement("a",{ href: "#" }, "Settings")
							),
							React.createElement("li", null,
								React.createElement("a",{ href: "#" }, "Profile")
							),
							React.createElement("li", null,
								React.createElement("a", { href: "#" }, "Help")
							)
						)
					),
					React.createElement('div',{className:"panel panel-default"},
						React.createElement('form',{className:"navbar-form pull-left"},
						React.createElement('a',{className:'span', "type":"text"}, "Login:"),
						React.createElement('input',{className:'span2', "type":"text"}),
						React.createElement('a',{className:'span', "type":"password"}, "Password:"),
						React.createElement('input',{className:'span2', "type":"text"}),
						React.createElement('button',{className:'btn btn-default', "id":"btn_submit_login","type":"submit"}, "Submit")
					)
				)	
	    );
	  }
	});


	
var SideBar = React.createClass({
	  displayName: "SideBar",
	  render: function render() {
	    return React.createElement("ul", { className: "nav nav-sidebar" },
			React.createElement("li", null, React.createElement("a",{ href: "#" },"Reports" )),
			React.createElement("li", null, React.createElement("a",{ href: "#" },"Exports")),
			React.createElement("li", null, React.createElement("hr")),
			React.createElement("li", null,
			
			React.createElement("div", {className:"dropdown"},
				React.createElement('button', {className:"btn btn-default dropdown-toggle", "type":"button", "id":"dropdownMenu1", "data-toggle":"dropdown", "aria-haspopup":"true", "aria-expanded":"true"},"My Dashboard",
                React.createElement('span', {className:'caret'})),
				React.createElement('ul', {className:"dropdown-menu dropdown-menu-right", "id":"dashboard_list", "aria-labelledby":"dropdownMenu1" })
				)),
			React.createElement("li", null, React.createElement("hr")),
			React.createElement("li", null,
			
			React.createElement("div", {className:"dropdown"},
				React.createElement('button', {className:"btn btn-default dropdown-toggle", "type":"button", "id":"dropdownMenu2", "data-toggle":"dropdown", "aria-haspopup":"true", "aria-expanded":"true"},"Indicateurs",
                React.createElement('span', {className:'caret', "id":"caret2"})),
				React.createElement(
					'ul',{ className:"dropdown-menu dropdown-menu-right", "aria-labelledby":"dropdownMenu2", "id":"ul_dropdownMenu" },
						React.createElement("li", {className:"dropdown-header"}, "Bar Charts") ,
						React.createElement("li",null,React.createElement("a",{ href: "#", onClick: function(){ 
						/*var response = confirm("Add IC1 to dashboard ?");
						if (response == true) {*/
							add_component("ic1");
						/*} else {
							alert("You pressed Cancel!");
						 }*/
						}, },"IC1")),
						React.createElement("li",null,React.createElement("a",{ href: "#" , onClick: function(){ 
						/*var response = confirm("Add PIE to dashboard ?");
						if (response == true) {*/
							add_component("pie");
						/*} else {
							alert("You pressed Cancel!");
						 }*/
						},},"PIE")),
						React.createElement("li", {className:"divider", "role":"separator"}),
						React.createElement("li", {className:"dropdown-header"}, "Bar-Line Charts") ,
						React.createElement("li",null,React.createElement("a",{ href: "#" , onClick: function(){ 
						/*var response = confirm("Add IE7 to dashboard ?");
						if (response == true) {*/
							add_component("ie7");
						/*} else {
							alert("You pressed Cancel!");
						 }*/
						},},"IE7")),
						React.createElement("li",null,React.createElement("a",{ href: "#" , onClick: function(){ 
						/*var response = confirm("Add IE5 to dashboard ?");
						if (response == true) {*/
							add_component("ie5");
						/*} else {
							alert("You pressed Cancel!");
						 }*/
						},},"IE5")),
						React.createElement("li",null,React.createElement("a",{ href: "#" , onClick: function(){ 
						/*var response = confirm("Add IE10 to dashboard ?");
						if (response == true) {*/
							add_component("ie10");
						/*} else {
							alert("You pressed Cancel!");
						 }*/
						},},"IE10")),
						React.createElement("li",null,React.createElement("a",{ href: "#" , onClick: function(){ 
						/*var response = confirm("Add IE13 to dashboard ?");
						if (response == true) {*/
							add_component("ie13");
						/*} else {
							alert("You pressed Cancel!");
						 }*/
						},},"IE13")),
						React.createElement("li",null,React.createElement("a",{ href: "#" , onClick: function(){ 
						/*var response = confirm("Add IE18 to dashboard ?");
						if (response == true) {*/
							add_component("ie18");
						/*} else {
							alert("You pressed Cancel!");
						 }*/
						},},"IE18")),
						React.createElement("li",null,React.createElement("a",{ href: "#" , onClick: function(){ 
						/*var response = confirm("Add IC2 to dashboard ?");
						if (response == true) {*/
							add_component("ic2");
						/*} else {
							alert("You pressed Cancel!");
							alert("You pressed Cancel!");
						 }*/
						},},"IC2"))
					)// fin dropdownmenu
				)),//fin div + li
				React.createElement("li", null, React.createElement("hr"))
				// React.createElement("ul", { className: "nav nav-sidebar" })
				)// fin du ul
		; 
	  }
	});

	
var MainFooter = React.createClass({
	  displayName: "MainFooter",

	  render: function render() {
	    return React.createElement("div",{ className: "container-fluid" },
			React.createElement('button',{className:'btn btn-default btn-footer', "id":"btn_save_dashboard","type":"submit", onClick: function(){ save_dashboard();}}, "Save to Dashboards"),
			React.createElement('button',{className:'btn btn-default btn-footer', "id":"btn_reset_view","type":"submit", onClick: function(){ reset_view();}}, "Reset View")
			)
			
			/* ,
				React.createElement('a',{className:"btn btn-info btn-lg"},
				React.createElement('span',{className:"glyphicon glyphicon-trash"}, "Reset")
				) */
	  }
	});
	
var DashboardFooter = React.createClass({
	  displayName: "DashboardFooter",

	  render: function render() {
	    return React.createElement("div",{ className: "container-fluid" },
			React.createElement('button',{className:'btn btn-default btn-footer', "id":"btn_save_dashboard","type":"submit", onClick: function(){ close_dashboard_view();}}, "Close"))

	  }
	});
	
ReactDOM.render(React.createElement(NavBar, null), document.getElementById('nav'));
ReactDOM.render(React.createElement(SideBar, null), document.getElementById('sidebar'));
ReactDOM.render(React.createElement(MainFooter, null), document.getElementById('main_footer'));
ReactDOM.render(React.createElement(DashboardFooter, null), document.getElementById('dashboard_footer'));


