// contentSlider.js

function slideItem(itemID, slideDir) {

	var numItems = eval(itemID + 'NumItems');
	var curOffset = eval(itemID + 'CurOffset');
	var visibleItems = eval(itemID + 'VisibleItems');
	var itemWidth = eval(itemID + 'ItemWidth');
	
	if (slideDir == 'next')
		curOffset -= itemWidth;
	else if (slideDir == 'prev')
		curOffset += itemWidth;
	else
		return false;
	

	if (curOffset >= 0)
		curOffset = 0;
	
	var nextEnd = (numItems-visibleItems) * itemWidth * -1;

	if (curOffset <= nextEnd)
		curOffset = nextEnd;

/*	var matrix = 'translate3d(' + curOffset + 'px, 0px, 0px)'; */
	var matrix = 'translate(' + curOffset + 'px, 0px)';

	$('#div_' + itemID + ' #contentSlider .belt').css('transform', matrix);
	
	eval(itemID + 'CurOffset' + "=" + curOffset);
	return false;
}




