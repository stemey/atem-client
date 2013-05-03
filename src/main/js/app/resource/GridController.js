define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/aspect",
	"gridx/Grid",
	'gridx/core/model/cache/Sync',
	"gridx/modules/VirtualVScroller",
	"gridx/modules/ColumnResizer",
	"gridx/modules/SingleSort",
	"gridx/modules/Filter",
	'gridx/modules/Focus',
	'gridx/modules/RowHeader',
	'gridx/modules/select/Row',
	"dojo/store/JsonRest",
	"dojo/json",
	"dojo/text!./tablestructure.json",
	"dojo/text!./table.json",
	"./EditorController",
	"dijit/_WidgetBase", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./grid.html",
	"dijit/layout/BorderContainer",
	"dijit/layout/ContentPane",
	"dijit/Toolbar"
], function(declare, lang, aspect, Grid, Cache, 
	VirtualVScroller, ColumnResizer, SingleSort, Filter, Focus, RowHeader, RowSelect, 
	 Store, json, tableStructure, tabledata, EditorController, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template){


	
return declare( [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		baseClass : "gformGridController",
		templateString : template,
		postCreate : function() {	
		},
		loadData: function(resource) {
			var props={ id: "grid"};
			props.cacheClass=Cache;
			props.structure = dojo.fromJson(resource.tableStructure);
			this.store = new Store({url: "", idProperty: resource.idProperty});
			props.store = this.store;
			props.modules= [
				VirtualVScroller,
				{
					moduleClass: RowSelect,
					multiple: false,
					triggerOnCell: true,
				},
				RowHeader
			];
			this.grid = new Grid(props);
			
			this.grid.select.row.connect(this.grid.select.row, "onSelected",lang.hitch(this,"rowSelected"));
			this.gridContainer.addChild(this.grid);
			this.borderContainer.layout();
			this.editorController.set("store", this.store);
			aspect.before(this.store,"remove",lang.hitch(this,"_onDelete"));
		},
		startup: function() {
			this.inherited(arguments);
		},
		rowSelected: function(e) {
			this.editorController.edit(e.id);
		},
		createNew: function() {
			this.editorController.createNew();
		},
		previous: function() {
			this._moveSelection(-1);
		},
		next: function() {
			this._moveSelection(1);
		},
		_onDelete: function() {
			this._moveSelection(1);
		},
		_moveSelection: function(delta) {
			var selectedId = this.grid.select.row.getSelected();
			if (selectedId) {
				var index = this.grid.model.idToIndex(selectedId);
				if (index<0) {
					return;
				}
				var nextId = this.grid.model.indexToId(index+delta);
				if (typeof nextId == "undefined") {
					return;
				}else{
					this.grid.select.row.deselectById(selectedId);
					this.grid.select.row.selectById(nextId);
				}
			}
		}	
	});


});
