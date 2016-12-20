// Searchbar JavaScript code for sfsbook

// toggleCategoryOption adds or removes a keyword from the search
function toggleCategoryOption() {
	var el = document.getElementById('query_field');
	var searchText = el.value;
	var optionValue = this.children[0].value;
	var re = new RegExp('\\b(' + optionValue + ')\\b', 'gi');
	var stringToReplace = optionValue.concat(', ');

	if(!searchText.match(stringToReplace) && !searchText.match(re)) {
		var hbox = document.getElementsByClassName('hbox')[0];
		var btn = document.createElement("BUTTON");
		btn.value = optionValue;
		var t = document.createTextNode(optionValue);
		btn.appendChild(t);
		var updateInsert = function(buttonValue){
			var searchfield = document.getElementById('query_field');
			searchfield.value = searchfield.value.replace(buttonValue, '');
		};
		btn.onclick = function(event){
			event.preventDefault();
			event.stopPropagation();
			updateInsert(this.value);
			this.remove();
		}
		hbox.appendChild(btn);
		if(searchText.length > 0) {
			el.value = searchText.concat(', ',this.children[0].value);
		} else {
			el.value = optionValue;
		}
	}
}

// toggleActiveClass adds or removes active from user-menu class element
function toggleActiveClass() {
	console.log('toggleactiveclassfiring', this.classList.value);
	if (this.classList.length > 1) {
		this.classList.toggle('user-menu-active');
	} else {
		var classes = this.classList.value.split(' ');
		classes.push('user-menu-active');
		this.classList.value = classes.join(' ');
	}
}

// toggleHiddenNav adds or removes hidden from nav on mobile
function toggleHiddenNav() {
	var navbar = document.getElementsByClassName('nav')[0];
	console.log('toggleactivenav firing', navbar);
	if(navbar.classList.length > 1) {
		navbar.classList.toggle('nav-hidden');
	} else {
		var classes = navbar.classList.value.split(' ');
		classes.push('nav-hidden');
		navbar.classList.value = classes.join(' ');
	}
}
// toggleHiddenCategory adds or removes hidden from category on mobile
function toggleHiddenCategory() {
	var category = this.children[1];
	console.log("togglecat", this, category);
	if(category.classList.length > 1){
		category.classList.toggle('category-hidden');
	} else {
		var classes = category.classList.value.split(' ');
		classes.push('category-hidden');
		category.classList.value = classes.join(' ');
	}
}
// addEventListener attaches toggleCategoryOption to the checkboxes
function addEventListener(el, eventName, handler) {
	eventName.preventDefault ? eventName.preventDefault() : (eventName.returnValue = false);
	if (el.addEventListener) {
		el.addEventListener(eventName, handler);
	} else {
		el.attachEvent('on' + eventName, function(){
			handler.call(el);
		});
	}
}

// attachToggles attaches event listener to each category option
function attachToggles() {
	//CEH: dry this up
	addEventListener(document.getElementsByClassName('logo')[0], 'click', toggleHiddenNav);
	var category = document.getElementsByClassName('category');
	var dropdowns = document.getElementsByClassName('user-menu');
	var categories = document.getElementsByClassName('category-option');
	for(var h = 0; h < category.length; h++){
		addEventListener(category[h], 'click', toggleHiddenCategory);
	}
	for(var i = 0; i < categories.length; i++){
		el = categories[i];
		addEventListener(el, 'click', toggleCategoryOption);
	}
	for(var j = 0; j < dropdowns.length; j++){
		el = dropdowns[j];
		addEventListener(el, 'click', toggleActiveClass);
	}
}

// ready calls addEventListener once the page has loaded
function ready(fn) {
	if (document.readyState != 'loading'){
		fn();
	} else if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', fn);
	} else {
		document.attachEvent('onreadystatechange', function() {
			if (document.readyState != 'loading') {
				fn();
			}  
		});
	}
}

//calls ready function with attachToggles
ready(attachToggles);
