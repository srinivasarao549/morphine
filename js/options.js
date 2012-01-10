(function(){
"use strict";

/*** charging ***/
var charge = {
	$interval: $("#charge-interval"),
	$intervaltext: $("output[for='charge-interval']"),
	$size: $("#charge-size"),
	$sizetext: $("output[for='charge-size']")
};

charge.$interval.change(function(){
	charge.$intervaltext.text("(every " + this.value + " minutes)");
	charge.$size.prop("max", (this.value / 10) * 2).change();
	
	Data.set("charge-interval", this.valueAsNumber);
});

charge.$size.change(function(){
	charge.$sizetext.text("(+" + this.value + " per charge)");
	
	Data.set("charge-size", this.valueAsNumber);
});

charge.$size.val(Data.get("charge-size"));
charge.$interval.val(Data.get("charge-interval")).change();


/*** targeting ***/
var target = {
	$block: $("#target-block"),
	$allow: $("#target-allow"),
	get: function(key){
		return Data.get("target-" + key).join("\n");
	},
	set: function(key, val){
		Data.set("target-" + key, val.split("\n").filter(function(v){
			return v;
		}).map(function(v){
			return v.trim();
		}));
	}
};

target.$block.on("input", function(){
	target.set("block", this.value);
});

target.$allow.on("input", function(){
	target.set("allow", this.value);
});

target.$block.val(target.get("block"));
target.$allow.val(target.get("allow"));


/*** blocking ***/
var block = {
	$radios: $("input[name='block']"),
	$url: $("#block-url")
};
block.$custom = block.$radios.last();
block.$excustom = block.$radios.not(block.$custom);

block.$excustom.change(function(){
	Data.set("block", this.value);
	block.$url.val(this.value);
});

block.$url.focus(function(){
	block.$custom.prop("checked", true);
}).on("input", function(){
	Data.set("block", this.value);
});

if (!block.$excustom.filter("[value='" + Data.get("block") + "']").prop("checked", true).length) {
	block.$custom.prop("checked", true);
}

block.$url.val(Data.get("block"));

})();