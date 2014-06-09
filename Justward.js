var Justward = Justward || {};
(function( app , win){ 


	var timers = [];

	function surge() {
        var elements = getAllElement('justward'); 
        for( var i = 0 ; i < elements.length ; i++ ) {
            var element = elements[i];

            // set width and height
            var children = element.children;
            var maxWidth = 0;
            var maxHeight = 0;
            for( var j = 0 ; j < children.length; j++ ) {
            	var child = children[j];
            	maxWidth = Math.max( maxWidth, child.offsetWidth );
            	maxHeight = Math.max( maxHeight, child.offsetHeight );
            }
            element.style['width'] = maxWidth + 'px';
            element.style['height'] = maxHeight+ 'px';


            var timer = setTimeout( move , 1000 , element , i );
            timers.push(true);

            element.setAttribute('data-justward-index' , i);

            element.addEventListener('click' , function() {
            	
            	var index = this.getAttribute('data-justward-index');
            	console.log( 'Stop : ' + index);

            	if( timers[index] ) {
            		timers[index] = false;	
            	} else {
            		timers[index] = true;	
            		setTimeout( move , 1000 , this , index );
            	}
            	


            });
        }
    }
    surge();



    function trackLoop() {

    }



    function move( element , index ) {
    	if( !timers[index] ) return;

        var direction = element.getAttribute('data-justward-dir')==null?"up":element.getAttribute('data-justward-dir');
        var list = element.children;
        
        // if( direction == "up" ) {

        	var first = list[0];
        	first.style.WebkitTransition = 'margin-top 0.4s linear 0s';
          	first.style.MozTransition = 'margin-top 0.4s linear 0s';
        	first.style['marginTop'] = '-' + first.offsetHeight + 'px';


        	var transitionEndFunction = function (event) {
			    //do some stuff here
			    first.removeEventListener('transitionend',transitionEndFunction, false );
			    element.insertBefore( first , list[list.length-1].nextSibling );
	        	first.style['marginTop'] = '0px';
            	setTimeout( move , 1000 , element , index );
			};
			first.addEventListener('transitionend', transitionEndFunction, false);



   //      }  else {

   //      	var first = list[1];

   //         	element.insertBefore( first , list[0] );     	
   //      	first.style['marginTop'] = '-' + first.offsetHeight + 'px';

   //      	first.style.WebkitTransition = 'margin-top 0.01s linear 0s';
   //        	first.style.MozTransition = 'margin-top 0.01s linear 0s';
          	


   //      	var transitionEndFunction = function (event) {
			//     // do some stuff here
			//     first.removeEventListener('transitionend',transitionEndFunction, false );
			// 	first.style.WebkitTransition = 'margin-top 0.4s linear 0s';
   //        		first.style.MozTransition = 'margin-top 0.4s linear 0s';
			// 	first.style['marginTop'] = '0px';

			//     var second = list[1];
			//     element.insertBefore( second , list[list.length-1].nextSibling );
   //          	setTimeout( move , 1000 , element, index );
			// };


			// first.addEventListener('transitionend', transitionEndFunction, false);

   // //      	var transitionEndFunction = function (event) {
			// //     //do some stuff here
			// //     first.removeEventListener('transitionend',transitionEndFunction, false );
			// //     element.insertBefore( first , list[list.length-1].nextSibling );
	  // //       	first.style['marginTop'] = '0px';
   // //          	setTimeout( move , 1000 , element );
			// // };
			// // first.addEventListener('transitionend', transitionEndFunction, false);
   //      }
    }

    app.elements = function() {
    	return getAllElement('justward');
    }


    function getAllElement( matchClass ) {
        var elems = document.getElementsByTagName('*'), i;
        var classElem = [];
        for (i in elems) {
            if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1) {
              classElem.push( elems[i]);
            }
        }
        return classElem;
    }

})( Justward , window );