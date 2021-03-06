defer = "true";



var tagStart="",tagEnd="";
sLnk="";
localStoragePrefix="neurobin-uedit-";
projectName="uedit";
autoSaveTimeout=5000;
contextMenu="context-menu";
localStorageNotSupported=0;
currentId="";

var jsonDefault = '{"html":[' +
'{"id":"","start":"","end":"","title":"Define it manually","class":"editor-button","innerhtml":"General","type":"textarea","winskey":"","macskey":""  },' +
'{"id":"","start":"<!-- ","end":" -->","title":"Comment","class":"editor-button","innerhtml":"Comment","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<p>","end":"</p>","title":"Paragraph","class":"editor-button","innerhtml":"P","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<a ","end":"</a>","title":"Hyperlink","class":"editor-button","innerhtml":"a href","href":"","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<li>","end":"</li>","title":"List Item","class":"editor-button","innerhtml":"li","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<blockquote>","end":"</blockquote>","title":"Block Quote","class":"editor-button","innerhtml":"bq","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<pre>","end":"</pre>","title":"pre","class":"editor-button","innerhtml":"pre","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<code>","end":"</code>","title":"Inline Code","class":"editor-button","innerhtml":"code","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<pre><code>","end":"</code></pre>","title":"Pre-formatted Code","class":"editor-button","innerhtml":"pre/code","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<img ","end":" />","title":"Image","class":"editor-button","innerhtml":"img","src":"","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<span>","end":"</span>","title":"Span","class":"editor-button","innerhtml":"span","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<kbd>","end":"</kbd>","title":"Keboad key","class":"editor-button","innerhtml":"kbd","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<sup>","end":"</sup>","title":"Superscript","class":"editor-button","innerhtml":"sup","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<sub>","end":"</sub>","title":"Subscript","class":"editor-button","innerhtml":"sub","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"","end":"<hr>","title":"Horizontal Rule","class":"editor-button","innerhtml":"hr","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"","end":"<br>","title":"New Line","class":"editor-button","innerhtml":"br","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<var>","end":"</var>","title":"Variable","class":"editor-button","innerhtml":"var","type":"input","winskey":"","macskey":""  },' +
'{"id":"","start":"<del>","end":"</del>","title":"Deleted text","class":"editor-button","innerhtml":"<del>del</del>","type":"input","winskey":"","macskey":""  }]}';

json=jsonDefault;


Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

function initAceEditor(){  


 //alert("Script loaded and executed.");
 ace.require("ace/ext/language_tools");
editor = ace.edit("editor-container");
    editor.setTheme("ace/theme/eclipse");
    editor.setShowPrintMargin(false);
    editor.getSession().setMode("ace/mode/php");
    editor.$blockScrolling = Infinity;
    editor.setOptions({
    enableBasicAutocompletion: true,
    spellcheck: true
    
});
   // Use anything defined in the loaded script...
return editor;
}




function findIndexByIdFromJSON(id){
		   var obj = JSON.parse(json);
    var array=obj.html;
    for(i=0;i<array.length;i++){
    if(array[i].id==id){return i;}
    
    }

}




var myEvent = window.attachEvent || window.addEventListener;
var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compitable

            myEvent(chkevent, function(e) { // For >=IE7, Chrome, Firefox

         var confirmationMessage = 'Are you sure to leave the page?';  // a space
                //(e || window.event).returnValue = fillStorage();
                
                return fillStorage();
            });


function getFromStorageById(id){
if (isLocalStorageEnabled()===true) {
return localStorage.getItem(localStoragePrefix+id);
}
else {return "";}

}

function getFromStorageByAbsoluteId(id){
if (isLocalStorageEnabled()===true) {
return localStorage.getItem(id);
}
else {return "";}
}



function getInputDialogFieldsFromStorage() {
var inputdialogfieldes=document.getElementsByName('uedit-add-button-dialog');
for (var i=0;i<inputdialogfieldes.length;i++) {
//if (localStorage.getItem("neurobin-uedit-"+inputdialogfieldes[i].id!="")) {
	if (/\buedit\-skey\-select\b/i.test(inputdialogfieldes[i].className)==false) {
inputdialogfieldes[i].value=getFromStorageByAbsoluteId("neurobin-uedit-"+inputdialogfieldes[i].id);}
else {inputdialogfieldes[i].value="";}
}
}


function getToolBar1InputFields() {
var toolBar1inputfields=document.getElementsByName('toolBar1-input-field');

for (var i=0;i<toolBar1inputfields.length;i++) {
//if (localStorage.getItem("neurobin-uedit-"+toolBar1inputfields[i].id)!="") {
toolBar1inputfields[i].value=getFromStorageByAbsoluteId("neurobin-uedit-"+toolBar1inputfields[i].id);}//}

}


function getFromStorage() { 

/*	if (!!localStorage.getItem("neurobin-uedit-html-div")) {
    document.getElementById("html-div").value=localStorage.getItem("neurobin-uedit-html-div");}*/

getInputDialogFieldsFromStorage();
getToolBar1InputFields();


json=getJSONString();

document.getElementById('save-as-path-input-field').value=getFromStorageByAbsoluteId('neurobin-uedit-save-as-filename');

}
//////////////////////////////Document is loaded inside the below statement
document.addEventListener('DOMContentLoaded', function () {
var fun=getFromStorage();
var fun1=setMainContentFromStorage();
document.body.onclick=function(){
hideContextMenu();

};
//$("body").css("overflow", "hidden");
document.body.style.overflow="hidden";
    }, false);
    
function fillStorageById(id,value){
if (isLocalStorageEnabled()===true) {
localStorage.setItem(localStoragePrefix+id,value);
}
else {
console.log(id+"="+value+"wasn't saved because local storage is unavailable");
}
}

function fillStorageByAbsoluteId(id,value){
if (isLocalStorageEnabled()===true) {
localStorage.setItem(id,value);
}
else {
console.log(id+"="+value+"wasn't saved because local storage is unavailable");
}
}
    
function fillStorageFromInputDialogFields() {
var inputdialogfieldes=document.getElementsByName('uedit-add-button-dialog');
    for (var i=0;i<inputdialogfieldes.length;i++) {
    	if (/\buedit\-skey\-select\b/i.test(inputdialogfieldes[i].className)==false) {
fillStorageByAbsoluteId("neurobin-uedit-"+inputdialogfieldes[i].id,inputdialogfieldes[i].value);}}

}
function removeItemFromStorageByAbsoluteId(id){
if (isLocalStorageEnabled()===true) {
	localStorage.removeItem(id);
	console.log("Local storage of custom buttons were removed");
}
else {
console.log(id+"wasn't deleted because local storage is unavailable");
}

}

function fillStorageFromToolBar1InputFields(){
    var toolBar1inputfields=document.getElementsByName('toolBar1-input-field');

    for (var i=0;i<toolBar1inputfields.length;i++) {
fillStorageByAbsoluteId("neurobin-uedit-"+toolBar1inputfields[i].id,toolBar1inputfields[i].value);}

}



function emptyStorageOfToolBar1InputFields() {
    var toolBar1inputfields=document.getElementsByName('toolBar1-input-field');

    for (var i=0;i<toolBar1inputfields.length;i++) {
removeItemFromStorageByAbsoluteId("neurobin-uedit-"+toolBar1inputfields[i].id);}

}


function fillStorageWithMainContent(){
fillStorageById("editor-main-content",editor.getSession().getValue());
}

function setMainContentFromStorage(){

editor.getSession().setValue(getFromStorageById("editor-main-content"));

}




function fillStorage() {
	

    
fillStorageFromInputDialogFields();
fillStorageFromToolBar1InputFields();


fillStorageByAbsoluteId('neurobin-uedit-json',json);

fillStorageWithMainContent();
    // Retrieve
    //document.getElementById("result").innerHTML = localStorage.getItem("lastname");

fillStorageByAbsoluteId('neurobin-uedit-save-as-filename',document.getElementById('save-as-path-input-field').value);

}






function wrapSelectedText(lang,elementId,id) {
	//tagParse(lang,tagIndex);
	//var fun=fillStorage();
	var obj = JSON.parse(json);
    var array=obj.html;
	//console.log(id+array[0].id);
	tagIndex=findIndexByIdFromJSON(id);



var tagname="",lastchar="",tag="";
tagname=array[tagIndex].start;
lastchar=tagname.slice(-1);
tag=tagname.substring(1,tagname.length-1);
tagname="html-"+tag;
//console.log(tagname);
tagStart = document.getElementById(id+"-start").value;
tagEnd   = document.getElementById(id+"-end").value;
if (tagStart==null) {
tagStart=array[tagIndex].start;}
if (tagEnd==null) {
tagEnd=array[tagIndex].end}


var href,src;
href=array[tagIndex].hasOwnProperty("href");
src=array[tagIndex].hasOwnProperty("src");
if (href&&!src) {
var sLnk=prompt('Put the URL here','http:\/\/');
if(sLnk&&sLnk!=''&&sLnk!='http://'){
	link=" href=\""+sLnk+"\">";
var replacementText=tagStart+link+editor.getSelectedText()+tagEnd;
editor.session.replace(editor.selection.getRange(), replacementText);
}
}
else if(src&&!href){
var lnk=prompt('Put the image URL here','http:\/\/');
var alt="image";
alt=lnk.split("/");
alt=alt[alt.length-1].substring(0,50);
if (editor.getSelectedText()!="") {alt=editor.getSelectedText();}
if(lnk&&lnk!=''){
	link=" src=\""+lnk+"\"";
var replacementText=tagStart+" alt=\""+alt+"\""+link+tagEnd;
editor.session.replace(editor.selection.getRange(), replacementText);
}

}

else {



var replacementText=tagStart+editor.getSelectedText()+tagEnd;
editor.session.replace(editor.selection.getRange(), replacementText);
}

}

function validateButtonClassName(classname,type){
	
var disabledButtonClassNames=['unavailable','disabled-link'];
var validButtonClassNames='warningcolor error message button unavailable disabled-link '+' '+
'quote light-quote warning edit comment caret-right caret-left caret-up caret-down editor-button '+
'custom dummy default ';
var validButtonClassNameRegex="uedit-btn-custom-*";
validButtonClassNameRegex=new RegExp(validButtonClassNameRegex);

if(type=="disabled"){
	
for (i=0;i<disabledButtonClassNames.length;i++) {
var regex="\\b"+disabledButtonClassNames[i]+"\\b";
regex=new RegExp(regex);
if(regex.test(classname)){
return "disabled";
}

}}

if (type="invalid") {
	var invalidFlag=0;
	classarr=classname.split(" ");
	for (i=0;i<classarr.length;i++) {
var regex="\\b"+classarr[i]+"\\b";
regex=new RegExp(regex);
if(!regex.test(validButtonClassNames)&& !validButtonClassNameRegex.test(classarr[i])){
return "invalid";
}

}//for

}//if

return "";
}


function createButtonFromAnyJSON(jsonstring,parentId,lang,classname){
	
    var obj = JSON.parse(jsonstring);
    var array=obj.html;
    for(var i=0;i<array.length;i++){
    var element = document.createElement("BUTTON");
    var brElement = document.createElement("BR");
    var type="input";
    if (array[i].type=="textarea") {type="textarea";}
    var startInput = document.createElement(type);
    var endInput = document.createElement(type);
    //Assign different attributes to the element. 
    element.innerHTML=array[i].innerhtml;
    if(array[i].id==""||array[i].id==null){
    element.id=lang+"-btn"+i;}
    else {element.id=array[i].id;}
    element.title=array[i].title;
    if (array[i].winskey!="") {element.title+=" **KBDS [  W/L:  "+array[i].winskey+"   Mac:  "+array[i].macskey+"  ]**";}
    array[i].id=element.id;
    json=JSON.stringify(obj);
    fillStorageByAbsoluteId('neurobin-uedit-json',json);
    
    element.className=array[i].class;
    if(validateButtonClassName(element.className,"disabled") == "disabled"){
    	element.style.cssText = "pointer-events: auto !important";
    	
    }
    else {
    element.onclick=function(){wrapSelectedText("html","editor-container",this.id);};
 }
    /////show context menu on right click
    if (element.addEventListener) {
        element.addEventListener('contextmenu', function(e) {
            showContextMenu(this);
            e.preventDefault();
        }, false);
    } else {
        element.attachEvent('oncontextmenu', function() {
           showContextMenu(this);
            window.event.returnValue = false;
        });
    }
    
    
    
//create input fields
startInput.value=array[i].start;
if(array[i].type!="textarea"){startInput.type="text";}
startInput.id=element.id+"-start";
startInput.placeholder="start";
if(array[i].type=="textarea"){startInput.style.resize="none";}
startInput.name="toolBar1-input-field";
//if(type!="textarea"){startInput.style.overflowY="none";}
startInput.onmouseover=function(){setTitleAsValueOfThisElement(this,"This will be inserted at the start of selection");}
if (startInput.addEventListener) {
  startInput.addEventListener('input', function() {
    fillStorage();
    console.log("fillStorage successful, stored in local storage");
  }, false);
} else if (startInput.attachEvent) {
  startInput.attachEvent('onpropertychange', function() {
    // IE-specific event handling code
    fillStorage();
    console.log("fillStorage successful, stored in local storage");
  });
}




endInput.value=array[i].end;
if(array[i].type!="textarea"){endInput.type="text";}
endInput.id=element.id+"-end";
endInput.placeholder="end";
if(array[i].type=="textarea"){endInput.style.resize="none";}
endInput.name="toolBar1-input-field";
//if(type!="textarea"){endInput.style.overflowY="none";}
endInput.onmouseover=function(){setTitleAsValueOfThisElement(this,"This will be inserted at the end of selection");}

if (endInput.addEventListener) {
  endInput.addEventListener('input', function() {
    fillStorage();
    console.log("fillStorage successful, stored in local storage");
  }, false);
} else if (endInput.attachEvent) {
  endInput.attachEvent('onpropertychange', function() {
    // IE-specific event handling code
    fillStorage();
    console.log("fillStorage successful, stored in local storage");
  });
}


    
    var foo = document.getElementById(parentId);
    //Append the element in page (in span).
var tr=document.createElement("tr");  
var td1=document.createElement("td");
var td2=document.createElement("td");
var td3=document.createElement("td");
td1.style.width="30%";
td2.style.width="35%";
td2.style.width="35%";
td2.style.overflow="none";
td3.style.overflow="none";
td1.appendChild(element);
td2.appendChild(startInput);
td3.appendChild(endInput);
tr.appendChild(td1);
tr.appendChild(td2);
tr.appendChild(td3);
    
    
    foo.appendChild(tr);
    if (array[i].winskey!=""&&array[i].macskey!="") {
    addCustomKeyBindingsForAceById(element.id,lang,element.id,array[i].winskey,array[i].macskey);}
    else {addCustomKeyBindingsForAceById(element.id,lang,element.id,"abracadabra","abracadabra");}
    
    
}

}

function createButtonFromJSON(parentId,lang,classname){
    //Create an input type dynamically.  
json=getJSONString();   
createButtonFromAnyJSON(json,parentId,lang,classname);

getFromStorage();

}


function createNewButton(parentId,lang,start,end,title,classname,innerhtml,type,position,winsKey,macsKey){

insertIntoJSON(lang,start,end,title,classname,innerhtml,type,position,winsKey,macsKey);

document.getElementById(parentId).innerHTML="";
createButtonFromJSON(parentId,lang,classname);




}

function validateShortCutKey(firstKey,secondKey,sKey){
	var msg=["valid","valid"];
	var readOnlyKeys="Ctrl-s ctrl-f ctrl-a ctrl-x ctrl-c ctrl-v ctrl-r ctrl-k ctrl-shift-k ctrl-space ctrl-tab alt-tab alt-space "+
	"ctrl-z shift-up shift-down shift-left shift- right ctrl-shift-z shift-home shift-end shift-pagedown shift-pageup ctrl-shift-home ctrl-shift-end";
	var invalidkeys=["^shift-\\S$"];
	var key=firstKey+secondKey+sKey;
	console.log(key);
	var regex="\\b"+key;
	regex=new RegExp(regex,"i");
	var twonlyreg="\\-(Up|Down|Left|Right|Space|Tab|Enter|Home|PageUp|PageDown|End|Insert|Delete|Esc|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12)";
	twonlyreg=new RegExp(twonlyreg,"i");
	var genkeyreg="^[^-]+\\-[^-\\s]+(\\-[\\S])?$";
	genkeyreg=new RegExp(genkeyreg,"i");
	
   if (firstKey==""&&secondKey=="") {sKey="";}
	else if(firstKey==secondKey){msg=["invalid","Both modifiers can't be the same"];}
	else if(twonlyreg.test(key)&&(sKey!="")){msg=["invalid","This key binding can't have third key"];}
	else if(!twonlyreg.test(key)&&(sKey==""||sKey==null)){msg=["invalid","Required Key field unfilled"];}
   else if(regex.test(readOnlyKeys)){msg=["invalid","This is a default key binding which you can't change"];}
   else if(!genkeyreg.test(key)){msg=["invalid","Are you sure you haven't put space as the last key?"];}
   
   
   for (var i=0;i<invalidkeys.length;i++) {
   var regex=new RegExp(invalidkeys[i],"i");
   if (regex.test(key)) {msg=["invalid","This key binding may create too much confusion, which is not allowed"];}
   
   }

return msg;

}




function validateForm(formId,parentId,task){
var inputfields=document.getElementsByName(formId);
console.log(inputfields[0]);
for(var i=0;i<inputfields.length;i++){
if (inputfields[i].checkValidity()==false) {
var head="<span class=\"error\">Invalid input!!</span>";
var msg="Define "+inputfields[i].title+" correctly";
openMessageDialog(head,msg);
return;

}
}
/////
var validMarkups=["span","kbd","var","s","del","q","b","i","u","code","em","small","sub","sup","mark"];
var pattern=/<[\s]*[^<]*[\s]*[^<>]*<?[\s]*\/?[\s]*\w*[\s]*>?/ig;
//var pattern=/<span[\s]*[\w\s"'=&;>]*[\s]*<\/span>/i
var name=document.getElementById(formId+'-innerhtml').value;
var result=name.match(pattern);
//var validPattern="/<"+"span"+"[\\s]*[\\w\\s\"'=&;>]*[\\s]*"+"<\\/"+"span"+">/i";
//console.log(validPattern);
if (result!=null) {
	var flag=0;
	console.log(result);
	for (var j=0;j<result.length;j++) {
	for (var i=0;i<validMarkups.length;i++) {
var validPattern="<"+validMarkups[i]+"[\\s]*[^<>]*>[\\s]*[^<>]*"+"<\\/"+validMarkups[i]+">";
validPattern=new RegExp(validPattern,"i");
var valid=result[j].match(validPattern); 
console.log(result[0]);
console.log(valid);
if (valid!=null) {flag++;}

}}
if (flag==0) {
	var head="<span class=\"error\">Invalid Markup!!</span>";
	var msg="<a href=\""+getInfoURL("btn-valid-markups")+"\" target=\"_blank\">See a list of valid markups and rules</a>";
openMessageDialog(head,msg);
return;
}
}

if (validateButtonClassName(document.getElementById(formId+'-class').value,"invalid")=="invalid") {
	var head="<span class=\"error\">Invalid Class Name!!</span>";
	var msg="<a href=\""+getInfoURL("btn-valid-classname")+"\" target=\"_blank\">See a list of valid Class Names</a>";
openMessageDialog(head,msg);
return;
}
	var firstKey=document.getElementById(formId+"-firstkey").value;
	var secondKey=document.getElementById(formId+"-secondkey").value;
	
	var sKey=document.getElementById(formId+"-skey").value;
	if (firstKey==""&&secondKey=="") {sKey="";}
var message=validateShortCutKey(firstKey,secondKey,sKey);
if(message[0]!="valid"){
	var head="<span class=\"error\">Invalid Key!!</span>";
	var msg=message[1]+"<br><a href=\""+getInfoURL("btn-custom-skey")+"\" target=\"_blank\">Learn more</a>";
openMessageDialog(head,msg);
return;
}




if(task=="add"){getFormDataAndCreateButton(formId,parentId);}
else {getFormDataAndEditButton(formId,parentId,currentId);}


}



function getFormDataAndCreateButton(formId,parentId){
var lang=document.getElementById(formId+"-lang").value;
var start=document.getElementById(formId+"-start").value;
var end=document.getElementById(formId+"-end").value;
var title=document.getElementById(formId+"-title").value;
var classname=document.getElementById(formId+"-class").value;
var innerhtml=document.getElementById(formId+"-innerhtml").value;
var type=document.getElementById(formId+"-type").value;
var position=document.getElementById(formId+"-position").value;
var firstKey=document.getElementById(formId+"-firstkey").value;
var secondKey=document.getElementById(formId+"-secondkey").value;
var skey=document.getElementById(formId+"-skey").value;
if (firstKey==""&&secondKey=="") {skey="";}
var winsKey=firstKey+secondKey+skey;
var macsKey=getMacKeyFromWinKey(firstKey)+getMacKeyFromWinKey(secondKey)+skey;

if (type!="textarea") {type="input";}
fillStorageFromInputDialogFields();
 createNewButton(parentId,lang,start,end,title,classname,innerhtml,type,position,winsKey,macsKey);
 


}


function getMacKeyFromWinKey(key){
if (key=="Ctrl-") {key="Command-";}
if (key=="Alt-") {key="Option-";}
return key;
}


function getFormDataAndEditButton(formId,parentId,id){
	itemGone(formId);
var lang=document.getElementById(formId+"-lang").value;
var start=document.getElementById(formId+"-start").value;
var end=document.getElementById(formId+"-end").value;
var title=document.getElementById(formId+"-title").value;
var classname=document.getElementById(formId+"-class").value;
var innerhtml=document.getElementById(formId+"-innerhtml").value;
var type=document.getElementById(formId+"-type").value;
var position=document.getElementById(formId+"-position").value;
position=getValidPosition(position);
var firstKey=document.getElementById(formId+"-firstkey").value;
var secondKey=document.getElementById(formId+"-secondkey").value;
var skey=document.getElementById(formId+"-skey").value;
if (firstKey==""&&secondKey=="") {skey="";}
var winsKey=firstKey+secondKey+skey;
var macsKey=getMacKeyFromWinKey(firstKey)+getMacKeyFromWinKey(secondKey)+skey;
console.log(winsKey+" "+macsKey);
if (type!="textarea") {type="input";}
json=getJSONString();
var obj=JSON.parse(json);
var array=obj.html;
if (position>=array.length) {position=array.length-1;}
for(var i=0;i<array.length;i++){
if (array[i].id===id) {
	array[i].start=start;
	array[i].end=end;
	array[i].title=title;
	array[i].class=classname;
	array[i].innerhtml=innerhtml;
	array[i].type=type;
	array[i].winskey=winsKey;
	array[i].macskey=macsKey;
	array.move(i,position);
fillStorageById(array[position].id+"-start",start);
fillStorageById(array[position].id+"-end",end);

}

}

json=JSON.stringify(obj);
fillStorageByAbsoluteId('neurobin-uedit-json',json);
fillStorageFromInputDialogFields();
document.getElementById(parentId).innerHTML="";
createButtonFromJSON(parentId,lang,classname);



}




function itemGone(itemId){
	
document.getElementById(itemId).style.transitionDuration="1s";
document.getElementById(itemId).style.right="-100%";
console.log("itemGone reached "+itemId);
}


function showInputDialog(formId){
document.getElementById(formId).style.transitionDuration=".7s";
document.getElementById(formId).style.right="0";
}
function getValidPosition(position){
	json=getJSONString();
var obj=JSON.parse(json);
var array=obj.html;
var patt=/^[0-9]+$/;
var result = position.match(patt);
if (position<0) {position=0;}
else if (result==null||result==""||position>array.length) {position=array.length;}
return position;
}

function returnUniqId(lang){
json=getJSONString();
var obj=JSON.parse(json);
var array=obj.html;
var id=lang+"-btn";
var idinc=0;
var idstring="";
for(var i=0;i<array.length;i++){idstring+=" "+array[i].id;}

for(var i=0;i<array.length;i++){
if (idstring.indexOf(id+idinc)>-1) { idinc++;}
}
return id+idinc;

}



function insertIntoJSON(lang,start,end,title,classname,innerhtml,type,position,winsKey,macsKey){

json=getJSONString();
var obj=JSON.parse(json);
var array=obj.html;
var patt=/^[0-9]+$/;
var result = position.match(patt);
if (position<0) {position=0;}
else if (result==null||result==""||position>array.length) {position=array.length;}

var newarrayitem={"id":"","start":"","end":"","title":"","class":"","innerhtml":"","type":"","winskey":"","macskey":"" };

newarrayitem.id=returnUniqId(lang);
console.log("Assigned Id: "+newarrayitem.id);
newarrayitem.start=start;
newarrayitem.end=end;
newarrayitem.title=title;
newarrayitem.class=classname;
newarrayitem.innerhtml=innerhtml;
newarrayitem.type=type;
newarrayitem.winskey=winsKey;
newarrayitem.macskey=macsKey;

//array.splice(position,0,newarrayitem);
//array.push(newarrayitem);
array.splice(position,0,newarrayitem);
json=JSON.stringify(obj);

fillStorageByAbsoluteId('neurobin-uedit-json',json);
fillStorageById(newarrayitem.id+"-start",start);
fillStorageById(newarrayitem.id+"-end",end);
}


function getJSONString(){
	if (isLocalStorageEnabled()==true) {
var jsonString=localStorage.getItem('neurobin-uedit-json');
if (jsonString!=null&&jsonString!="") {json=jsonString;}  
return json;
}
else {return jsonDefault;}
}

function createButtonFromDefaultJSON(parentId,lang,classname){
emptyStorageOfToolBar1InputFields();
document.getElementById(parentId).innerHTML="";
createButtonFromAnyJSON(jsonDefault,parentId,lang,classname);
fillStorage();
}

function resetButtonsToDefault(parentId,lang,classname){
	currentParentId=parentId;
	currentLang=lang;
	currentClassName=classname;

/*    if (confirm("Confirm Action: You are going to delete all custom toolBar buttons and reset them to default") == true) {
        var call1=createButtonFromDefaultJSON(parentId,lang,classname);
    } else {
        
    }	*/
	
openModalDialog("<span class=\"warningcolor\">Attention!!</span>","Are you sure you want to delete all button customizaion and reset to default ?");


}

function openMessageDialog(head,msg){
	var dialog=document.getElementById("messageDialog");

   var header=dialog.getElementsByTagName('h2');
   header[0].innerHTML=head;
   var message=dialog.getElementsByTagName("p");
   message[0].innerHTML=msg;
	
var buttons=dialog.getElementsByTagName("button");
	for (var i=0;i<buttons.length;i++) {
buttons[i].innerHTML=buttons[i].name;
	}

   dialog.style.display="block";
	dialog.style.opacity="1";
	dialog.style.pointerEvents="auto";


}



function openModalDialog(head,msg){
	var dialog=document.getElementById("openModal");

   var header=dialog.getElementsByTagName('h2');
   header[0].innerHTML=head;
   var message=dialog.getElementsByTagName("p");
   message[0].innerHTML=msg;
	
var buttons=dialog.getElementsByTagName("button");
	for (var i=0;i<buttons.length;i++) {
buttons[i].innerHTML=buttons[i].name;
	}

   dialog.style.display="block";
	dialog.style.opacity="1";
	dialog.style.pointerEvents="auto";
   
}

function closeMessageDialog(){
	var dialog=document.getElementById("messageDialog");
	dialog.style.opacity="0";
	dialog.style.pointerEvents="none";
	dialog.style.display="none";


}


function closeModalDialog(){
	var dialog=document.getElementById("openModal");
	dialog.style.opacity="0";
	dialog.style.pointerEvents="none";
	dialog.style.display="none";


}

function processModalDialgButtonEvent(id){
	if (document.getElementById(id).value=="right") {
	var call1=createButtonFromDefaultJSON(currentParentId,currentLang,currentClassName);
	var call2=closeModalDialog();
	}
	else if(document.getElementById(id).value=="left"){
var call1=closeModalDialog();	
	}
	

}
function autoSaveMainContent(){
	fillStorageWithMainContent();
	setTimeout(autoSaveMainContent,autoSaveTimeout);

}

function setTitleAsValueOfThisElement(id,defaultTitle) {
if(id.value!=""&&id.value!=null){id.title=id.value;}else{id.title=defaultTitle;}
}

function showContextMenu(id){
	
var pos=getPosition(id);
var body = document.body,html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight );

    ctxm=document.getElementById(contextMenu); 
    ctxm.style.left=pos.x+"px";
    ctxm.style.top=pos.y+"px";
    ctxm.style.display="block";
if(pos.y>height-ctxm.scrollHeight){pos.y=pos.y-(pos.y-height+ctxm.scrollHeight)-5;}
ctxm.style.top=pos.y+"px";
ctxmItems=ctxm.getElementsByTagName("a");
for(var i=0;i<ctxmItems.length;i++){
ctxmItems[i].onclick=function(){
	console.log("Id: "+id.id+" Action: "+this.name);
processInputFromContextMenu(id,this.name);
}}

}



function hideContextMenu(){
    document.getElementById(contextMenu).style.display="none";
}



/*function getPosition(e) {
  var posx = 0;
  var posy = 0;
 
 if(!e){ var e = window.event;}
 
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft +
                       document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop +
                       document.documentElement.scrollTop;
  }
 
  return {
    x: posx,
    y: posy
  }
}*/

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function processInputFromContextMenu(id,itemName){

if (itemName=="delete") {
deleteButtonFromArray("toolBar1","html",[id.id]);
}
if (itemName=="edit") {
	
editButtonIntoArray("uedit-edit-button-dialog","toolBar1","html",[id.id]);
console.log("Id: "+id.id+" Action: "+itemName);
}

}



function deleteButtonFromArray(parentId,lang,idarr){
json=getJSONString();
var obj=JSON.parse(json);
var array=obj.html;
for (var j=0;j<idarr.length;j++) {
for (var i=0;i<array.length;i++) {
	if (array[i].id==idarr[j]) {
	var toolBar1inputfields=document.getElementsByName('toolBar1-input-field');
   if(typeof toolBar1inputfields[i] != 'undefined'){
   	
   	removeItemFromStorageByAbsoluteId("neurobin-uedit-"+array[i].id+"-start");
   	removeItemFromStorageByAbsoluteId("neurobin-uedit-"+array[i].id+"-end");
      console.log("Storage item removed: "+array[i].id+"-start and "+array[i].id+"-end");}
      array.splice(i,1);
   }
}}

json=JSON.stringify(obj);
fillStorageByAbsoluteId('neurobin-uedit-json',json);
document.getElementById(parentId).innerHTML="";
createButtonFromJSON(parentId,lang,"editor-button");

}

function splitKey(key){
	var genkeyreg="^([^-]+)\\-([^-\\s]+)(\\-([\\S]))?$";
	genkeyreg=new RegExp(genkeyreg,"i");
	var res=key.match(genkeyreg);
	if(res!=null){
	if (!!res[1]){firstKey=res[1]+"-";}else {firstKey="";}
	if (!!res[3]){sKey=res[res.length-1];}else {sKey="";}
	if (!!res[2]){if(res[2].length!=1){secondKey=res[2]+"-";}else {sKey=res[2];secondKey="";}}else {secondKey="";}
	
	}
	else {firstKey="";secondKey="";sKey="";}
	return [firstKey,secondKey,sKey];

}


function editButtonIntoArray(formId,parentId,lang,idarr){
	
	json=getJSONString();
var obj=JSON.parse(json);
var array=obj.html;
for (var j=0;j<idarr.length;j++) {
for (var i=0;i<array.length;i++) {
	if (array[i].id==idarr[j]) {
document.getElementById(formId+"-lang").value="html";
document.getElementById(formId+"-start").value=getFromStorageById(idarr[j]+"-start");
document.getElementById(formId+"-end").value=getFromStorageById(idarr[j]+"-end");
document.getElementById(formId+"-title").value=array[i].title;
document.getElementById(formId+"-class").value=array[i].class;
document.getElementById(formId+"-innerhtml").value=array[i].innerhtml;
document.getElementById(formId+"-type").value=array[i].type;
document.getElementById(formId+"-position").value=i;


var keyarr=splitKey(array[i].winskey);
console.log(keyarr[0]+keyarr[1]+keyarr[2])
document.getElementById(formId+"-firstkey").value=keyarr[0];
document.getElementById(formId+"-secondkey").value=keyarr[1];
document.getElementById(formId+"-skey").value=keyarr[2];

currentId=idarr[j];
console.log("array index="+i);
}
}}

fillStorageFromInputDialogFields();
showInputDialog(formId);

}


function saveAsUeditMainContent(){
	var filename=document.getElementById("save-as-path-input-field").value;
	if(filename==""||filename==null){filename="uedited-file";}
var blob = new Blob([editor.getSession().getValue()], {type: "text/plain;charset=ASCII"});
saveAs(blob, filename);


}
function getSaveFileName(){
var returnval=document.getElementById('save-as-path-input-field').value;
if (returnval==""||returnval==null) {returnval="uedited-file";}
return returnval;
}

function getSaveContent(){

return editor.getSession().getValue();
}

function initDownloadify(){
		Downloadify.create('uedit-save-as-button',{
				filename: function(){
					var ret=getSaveFileName();
					return ret;
				},
				data: function(){ 
				var ret=getSaveContent();
					return ret;
				},
				onComplete: function(){  },
				onCancel: function(){  },
				onError: function(){  },
				swf: 'media/downloadify.swf',
				downloadImage: 'images/download.png',
				width: 100,
				height: 30,
				transparent: true,
				append: false
			});
}

function removeKeyBindingsFromAceByArray(nameArray){
editor.commands.removeCommands(nameArray);
}
function removeKeyBindingsFromAceById(id){
//editor.commands.bindKeys({"ctrl-l":null, "left":null})  // or
editor.commands.bindKey(id, null); // or
console.log("key remove");
}

function removeKeyBindingsFromAceByKey(key){
editor.commands.bindKeys({key:null});
}

function addCustomKeyBindingsForAceById(id,lang,Name,winsKey,macsKey){
	if ((winsKey!=null&&winsKey!="")||(macsKey!=null&&macsKey!="")) {
editor.commands.addCommand({
name: id,
bindKey: {win: winsKey, mac: macsKey},
exec: function(editor) {
wrapSelectedText(lang,"editor-container",id);
},
readOnly: true
});
}
else {}
}


function addCustomKeyBindingsForAce(){
///ctrl+s key
editor.commands.addCommand({
name: 'save',
bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
exec: function(editor) {
saveAsUeditMainContent();
},
readOnly: true // false if this command should not apply in readOnly mode
}); 

///Changing default replace shortcut to ctrl+R
editor.commands.addCommand({
name: 'replace',
bindKey: {win: 'Ctrl-R', mac: 'Command-Option-F'},
exec: function(editor) {
ace.config.loadModule("ace/ext/searchbox", function(e) {e.Search(editor, true)});
},
readOnly: true
});


}

function getInfoURL(id) {
	var dir,file;
	dir=window.location.href.substr(0,window.location.href.lastIndexOf("/")+1);
	file=window.location.href.substr(window.location.href.lastIndexOf("/")+1);
var ext=file.substr(file.lastIndexOf("."));
var filename=file.substr(0,file.lastIndexOf("."));

showInfoURL=dir+"showinfo/#"+id;
return showInfoURL;
}


function showUeditInfo(id){
	var width=screen.width/1.6,height=screen.height/1.3;
if (width<=400) {width=screen.width;}
if (height<=400) {height=screen.height;}
window.open(getInfoURL(id),"Uedit Info","width="+width+", height="+height+", scrollbars=yes, resizable=yes ");

}

function removeFirstRunTag() {
fillStorageByAbsoluteId('neurobin-uedit-firstRun',"notNull");
console.log("First run tag removed");
}

function checkForFirstRunAndInitializeButtons(parentId,lang,classname){
	currentParentId=parentId;
	currentLang=lang;
	currentClassName=classname;
	if (getFromStorageByAbsoluteId('neurobin-uedit-firstRun')!="notNull") {
createButtonFromDefaultJSON(currentParentId,currentLang,currentClassName);
console.log("This was a frist run for this browser");
removeFirstRunTag();
}
else {
createButtonFromJSON(currentParentId,currentLang,currentClassName);
}


}


function checkForLocalStorageSupport(){
	if (typeof(Storage) != "undefined") {
		console.log("Local Storage supported");
		if (isLocalStorageEnabled()===false) {
var head="<span class=\"error\">Local Storage Disabled!!</span>";
var msg="It seems Local Storage support is disabled in your browser. Please enable it from browser settings and reload the editor.<br><a href=\""+getInfoURL("local-storage-disabled")+"\">Learn More</a>";
openMessageDialog(head,msg);return;}
}
else {
	if (localStorageNotSupported==0) {
var head="<span class=\"error\">Local Storage Not supported!!</span>";
var msg="Check if your browser supports the use of local Storage<br><a href=\""+getInfoURL("local-storage-not-found")+"\">Learn More</a>";
openMessageDialog(head,msg);
localStorageNotSupported=1;return;
}
}

}

function isLocalStorageEnabled(){
    var test = "test";
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}
function resetAllStorage() {
	localStorage.clear();
}

function reloadAceEditor(){
editor=initAceEditor();
setMainContentFromStorage();
editor.getSession().on('change', function(e) {
fillStorageWithMainContent();
console.log("Main content saved");
});

addCustomKeyBindingsForAce();
}

