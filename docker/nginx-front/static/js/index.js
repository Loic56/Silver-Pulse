var CommentBox = React.createClass({
	  displayName: "CommentBox",

	  render: function render() {
	    return React.createElement("div",{ className: "commentBox" },
	    			React.createElement("h1",null,"Comments"),
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
					)
	    );
	  }
	});



function RAZ_view() {
	RAZ_form();
	RAZ_presentation();
	RAZ_presentation_list();
};




var SideBar = React.createClass({
	  displayName: "SideBar",
	  render: function render() {
	    return React.createElement("ul", { className: "nav nav-sidebar" },
			React.createElement("li", null, React.createElement("a",{ href: "#",  
				onClick: function(){
						RAZ_view();
						ReactDOM.render(React.createElement(UserView, null), document.getElementById('presentation_tab'));
					} 
				},"Users" )),
			React.createElement("li", null, React.createElement("a",{ href: "#",  
				onClick: function(){
						RAZ_view();
						ReactDOM.render(React.createElement(ProjectAreaView, null), document.getElementById('presentation_tab'));
					} 
				},"Project Areas" )),
			React.createElement("li", null, React.createElement("a",{ href: "#",  
				onClick: function(){
						RAZ_view();
						ReactDOM.render(React.createElement(ProjectView, null), document.getElementById('presentation_tab'));
					} 
				},"Projects" )),
			React.createElement("li", null, React.createElement("a",{ href: "#",  
				onClick: function(){
						RAZ_view();
						ReactDOM.render(React.createElement(SerieView, null), document.getElementById('presentation_tab'));
					} 
				},"Series" )),
			React.createElement("li", null, React.createElement("a",{ href: "#",  
				onClick: function(){
						RAZ_view();
						ReactDOM.render(React.createElement(TicketView, null), document.getElementById('presentation_tab'));
					} 
				},"Tickets" ))
			)}
	});

var MainFooter = React.createClass({
	  displayName: "MainFooter",

	  render: function render() {
	    return React.createElement("div",{ className: "container-fluid" },
			React.createElement('button',{className:'btn btn-default btn-footer', "id":"btn_save_dashboard","type":"submit", onClick: function(){ save_dashboard();}}, "Save to Dashboards"),
			React.createElement('button',{className:'btn btn-default btn-footer', "id":"btn_reset_view","type":"submit", onClick: function(){ reset_view();}}, "Reset View")
			)
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
