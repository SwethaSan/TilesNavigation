# TilesNavigation
<script src="https://lspug.sharepoint.com/sites/fun/siteassets/jquery-3.3.1.min.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="https://lspug.sharepoint.com/sites/fun/SiteAssets/StyleTiles.css" />
<link rel="stylesheet" type="text/css" href="https://lspug.sharepoint.com/sites/fun/SiteAssets/bootstrap.css" />
<style type="text/css">
.container1  img{
	width:100%;
	height:100%;
	padding:5px;
  	box-shadow:2px 2px;
}
.content{display:none;}
.ch-info p {
	border:0;
	padding:0;
}
.ch-item{
	cursor:pointer;
}
.ch-grid li{
	width:200px !important;
	height:200px !important;
}
.hpanel{
background: rgb(255,255,255); /* Old browsers */
background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed',GradientType=0 ); /* IE6-9 */
}
</style>
<br>
<div class="container1 panel panel-primary hpanel">
<div class="panel-heading" style="text-align:center;">MY TEAM</div>
  <section class="main panel-body">
    	<ul class="ch-grid" id="tilesUL"></ul>
  </section>
</div>
<script class="code" type="text/javascript">
var li="";
(function(){
$(document).ready(function() { 
    // make sure the SharePoint script file 'sp.js' is loaded before code runs
		SP.SOD.executeFunc('sp.js', 'SP.ClientContext', loadListData);
});
function loadListData(){
	loadThisList("LandingPageTiles",listLoadSuccess,globalError);
}
function loadThisList(listName, onSuccess, onFail){
    var ctx= new SP.ClientContext.get_current();
    var oList=ctx.get_web().get_lists().getByTitle(listName);
	var q=SP.CamlQuery.createAllItemsQuery();
	colListItem = oList.getItems(q);
	ctx.load(colListItem); 
	ctx.executeQueryAsync(function(sender, args){onSuccess(colListItem);},onFail);
}
function listLoadSuccess(sender,args){
	var listItemsCollection = colListItem.getEnumerator();
	var listItemsCount=colListItem.get_count();
	console.log("List count:"+listItemsCount);
	while (listItemsCollection.moveNext()){
		var item=listItemsCollection.get_current();
		var title=item.get_item('Title');
		var icon=item.get_item('ImageURL');
		var redirect=item.get_item('RedirectURL');
		var desc=item.get_item('Description');
		buildDiv(title,icon,redirect,desc);
		console.log(title+" "+icon+" "+redirect+" "+desc);
	}
	console.log(li);
	document.getElementById("tilesUL").innerHTML = li;	
}
//error handler - generic
function globalError(sender, args) {
     alert(args.get_message());
   }

function buildDiv(title,icon,redirect,desc){
		li+="<li>"+
			"<a href='"+redirect+"' target='_blank' class='url'>"+
			"<div class='ch-item'>"+
			"<div class='ch-info-wrap'>"+
			"<div class='ch-info'>"+
			"<div class='ch-info-front'><img  src='"+icon+"' alt='"+title+"'></img><p style='color:grey'>"+title+"</p></div>"+
			"<div class='ch-info-back'><h3>"+title+"</h3>"+
			"<p>"+desc+"</p>"+
			"<p>VIEW THE SITE</p>"+
			"</div></div></div></div></a></li>";
}
   
})();
</script>
