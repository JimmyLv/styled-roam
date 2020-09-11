/* global  loadKeyEvents, loadTypeAhead, loadJumpNav, jumpToDateComponent, rmQuickRefenceSystem, device, displayStartup */

const disabledFeatures = typeof window.disabledFeatures !== 'undefined' ? window.disabledFeatures : [];

function addScriptToPage(tagId, script) {
  addElementToPage(Object.assign(document.createElement('script'),{src:script}) , tagId, 'text/javascript')
}

function addModuleToPage(tagId, script) {
  addElementToPage(Object.assign(document.createElement('script'),{src:script}) , tagId, 'module')
}

function addCSSToPage(tagId, cssToAdd) {
  addElementToPage(Object.assign(document.createElement('link'),{href:cssToAdd, rel: 'stylesheet'} ) , tagId, 'text/css')
}

function addElementToPage(element, tagId, typeT ) {
  try { document.getElementById(tagId).remove() } catch(e){}  //Delete any existing reference
  if(disabledFeatures && disabledFeatures.indexOf(tagId) > -1) { return } //Exit if disabled
  Object.assign(element, { type:typeT, async:false, tagId:tagId } )
  document.getElementsByTagName('head')[0].appendChild(element)
}

const URLScriptServer =  document.currentScript.src.replace('main.js','')

addCSSToPage( 'cssCard',     'https://cdn.jsdelivr.net/gh/JimmyLv/styled-roam@dev/card.min.css' )
addScriptToPage( 'switchMode'  ,       URLScriptServer + 'js/switch.js'         )
