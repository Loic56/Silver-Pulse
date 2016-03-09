//##########################
//######### SERIES #########
//##########################

var SerieView = React.createClass({
	  displayName: "SerieView",
	  render: function render() {
	    return React.createElement("div", { className: "row" },
	    			React.createElement("h1",{ className: "page-header form-title" }, "Series"),
					React.createElement("ul", { className: "nav nav-pills" },
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(InsertSerieForm, null), document.getElementById('presentation_form'));
								}
							},"Insert Serie" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form(),
								ReactDOM.render(React.createElement(ReadSerieForm, null), document.getElementById('presentation_form'));
								}
							},"Read Serie" )),
						React.createElement("li", null, React.createElement("a",{ href: "#", 
							onClick: function(){ 
								RAZ_form();
								ReactDOM.render(React.createElement(DeleteSerieForm, null), document.getElementById('presentation_form'));
								}
							},"Delete Serie" ))
						)
	    		);
	  		}
	});



function allProjectAreas(){
	var projectAreas = [];
	var xmlhttp  = new XMLHttpRequest(); 
	var url = "http://192.168.99.101:8000/project_areas/?";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	xmlhttp.onload = function (e) {
		if (xmlhttp.readyState === 4) {
			if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
				var json = JSON.parse(xmlhttp.responseText);
				var count = json.count;
				if (count == 0){
					alert("Aucun Project Area référencé");
				}
				else {
					var results = json.results;
					for (var i in results) {
						projectAreas.push(results[i].auto_id +";"+ results[i].title);
					}
				}
			}
		}
	};
	xmlhttp.onerror = function (e) {
		console.error("Error");
	};
	return projectAreas;
}



var InsertSerieForm = React.createClass({
	displayName: "InsertSerieForm",
	getInitialState: function() {
		var x = this.loadProjectAreas();
    	return {data: x };
  	},
  	loadProjectAreas(){
		var projectAreas = [];
		var xmlhttp  = new XMLHttpRequest(); 
		var url = "http://192.168.99.101:8000/project_areas/?";
		// la requete doit être synchrone (false)
		xmlhttp.open("GET", url, false);
		xmlhttp.send(null);
		if (xmlhttp.status === 200) {
			var json = JSON.parse(xmlhttp.responseText);
			var count = json.count;
			if (count == 0){
				alert("Aucun Project Area référencé");
			}
			else {
				var results = json.results;
				for (var i in results) {
				projectAreas.push(results[i].auto_id +";"+ results[i].title);
				}
			}
		}
		return projectAreas;
  	},
	change: function(event){
	  	var select1 = document.getElementById("selected_project_area");
		var choice = select1.selectedIndex;
		var project_area_id = select1.options[choice].value;
		var projects = [];
		var xmlhttp  = new XMLHttpRequest(); 
		var url = "http://192.168.99.101:8000/projects/?project_areas_id="+ project_area_id;
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
		xmlhttp.onload = function (e) {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200 && xmlhttp.responseText != "KO") {
					// suppression des ancienne valeurs
					var selected_project = document.getElementById("selected_project");
					var length = selected_project.options.length;
					for (i = 0; i < length;) {
					  selected_project.options[i] = null;
					  length = selected_project.options.length;
					}
					// Nnouvelles valeurs
					var json = JSON.parse(xmlhttp.responseText);
					var count = json.count;
					if (count == 0){
						console.log("Aucun Project référencé");
					}
					else {
						var results = json.results;
						for (var i in results) {
							projects.push( results[i].title );
						}
						projects.map(function(element) {
							var option = document.createElement("option");
							option.text = element;
							selected_project.add(option);
					    });
					}
				}
			}
		};
		xmlhttp.onerror = function (e) {
			console.error("Error");
		};
      },

	  render: function render() {
	    return React.createElement("div", {className: "form-horizontal" },
	    		React.createElement("div", {className: "form-group" },
	    			React.createElement("label", {className: "col-sm-10", "for":"serie_title" }, null, "Title:"),
	    			React.createElement("div", {className:"col-sm-10"},
	    				React.createElement("input", {className:"form-control", type:"text",  id:"serie_title", placeholder:"Enter serie title" }, null)
				    )
				),
				// onchange > qd on selectionne un "Project Area Id" la liste des "Project Id" en dessous se met à jour
				React.createElement("div", {className: "form-group" },
					React.createElement("label", {className: "col-sm-10"}, null, "Project Area id:"),
					React.createElement("div", {className: "col-sm-10"},
						React.createElement("select", {onChange:this.change, id:"selected_project_area", className: "input-large form-control"}, 
		    		    	this.state.data.map(function(element) {
		    		    		var res = element.split(";");
	            				return React.createElement("option", { value: res[0] }, res[1]);
		    				})
		    			)
		    		)
		    	),
				React.createElement("div", {className: "form-group" },
					React.createElement("label", {className: "col-sm-10"}, null, "Project id:"),
					React.createElement("div", {className: "col-sm-10"},
						React.createElement("select", { id:"selected_project", className: "input-large form-control"}
							// project id à ajouter dynamiquement
		    			)
		    		)
		    	),
				React.createElement("div", {className: "form-group" },
					React.createElement("label", {className: "col-sm-10"}, null, "Group:"),
					React.createElement("div", {className: "col-sm-10"},
						React.createElement("select", { id:"selected_group", className: "input-large form-control"}, 
							React.createElement("option", { value: 1 }, "Group 1"),
							React.createElement("option", { value: 2 }, "Group 2"),
							React.createElement("option", { value: 3 }, "Group 3"),
							React.createElement("option", { value: 4 }, "Group 4")
		    			)
		    		)
		    	),
				React.createElement("div", {className: "form-group" },
					React.createElement("label", {className: "col-sm-10"}, null, "Status:"),
					React.createElement("div", {className: "col-sm-10"},
						React.createElement("select", { id:"selected_status", className: "input-large form-control"}, 
							React.createElement("option", {value: "Nouveau"}, "Nouveau"),
							React.createElement("option", {value: "En attente"}, "En attente"),
							React.createElement("option", {value: "Ouvert"}, "Ouvert"),
							React.createElement("option", {value: "Fermé"}, "Fermé")
		    			)
		    		)
		    	),
	    		React.createElement("div", {className: "form-group" },
	    			React.createElement("label", {className: "col-sm-10", "for":"serie_title" }, null, "Description:"),
	    			React.createElement("div", {className:"col-sm-10"},
	    				React.createElement("input", {className:"form-control", type:"text",  id:"serie_description", placeholder:"Enter serie description" }, null)
				    )
				),
				React.createElement("div",{ className: "form-group col-sm-10" },
					React.createElement('button', {className:'btn btn-default', "id":"btn_insert_serie","type":"submit", 
						onClick: function(){ alert("insert serie"); }
					}, "Insert")
				)
	    	);
	  	}
	});




var ReadSerieForm = React.createClass({
	  displayName: "ReadSerieForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { "for":"serie_id" }, null, "Serie:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"serie_id", placeholder:"Enter serie ID" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_read_serie","type":"submit", 
					onClick: function(){ alert("read serie"); }
				}, "Submit")
		
	    	);
	  	}
	});
var DeleteSerieForm = React.createClass({
	  displayName: "DeleteSerieForm",
	  render: function render() {
	    return React.createElement("form", { role: "form" },
	    		React.createElement("div",{ className: "form-group" },
	    			// Warning: Unknown DOM property for. Did you mean htmlFor?
	    			React.createElement("label", { "for":"serie_id" }, null, "Serie:"),
	    			React.createElement("input", { className:"form-control", type:"text",  id:"serie_id", placeholder:"Enter serie ID" }, null)
				    ),
				React.createElement('button', {className:'btn btn-default', "id":"btn_del_serie","type":"submit", 
					onClick: function(){ alert("delete serie"); }
				}, "Delete")
		
	    	);
	  	}
	});
