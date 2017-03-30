// horizontalSlider.js

function slideItem(itemID, slideDir) {

	var numItems = eval(itemID + 'HorNumItems');
	var curOffset = eval(itemID + 'HorCurOffset');
	var visibleItems = eval(itemID + 'HorVisibleItems');
	var itemWidth = eval(itemID + 'HorItemWidth');
	
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
	$('#horizontalSlider .belt').css('transform', matrix);
	
	eval(itemID + 'HorCurOffset' + "=" + curOffset);

	return false;
}




