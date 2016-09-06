function loadReviews(conatainerID)
{
	//Disable Load View button. All reviews will be loaded with first click.
	$("#loadReviewButton").attr('disabled',true);
	//Get container div from container ID
	var containerDIV = $("#"+conatainerID);
	
	
	var myPrivateScope = new MyPrivateScope();
	myPrivateScope.containerDIV = containerDIV;
	myPrivateScope.loadjsonAndGenerateReviews();
}
//This is a private scope unaccessable from outside
var MyPrivateScope = function(){

/*This function will load JSON data.
**It will call callback function when data is loaded. It will also pass containerDIV to callback function.
**If Json fail to load e.g. when try to run index.html file without web server, 
**It will call dynamic generator function with default JSON object that is decalred at bottom
*/
this.containerDIV;
this.loadjsonAndGenerateReviews = function(){
											//Load JSON data for reviews
											loadjson("reviews.json", generateDynamicReviews, this.containerDIV );
											}

function loadjson(jsonURL,callbackMethod, containerDIV)
{
	var jqJsonLoader = $.getJSON( jsonURL, function(data) {
	  console.log( "success" );
	  //generate reviews if dynamic data is loaded
	  callbackMethod(data, containerDIV);
	})
	  .done(function() {
		console.log( "second success" );
	  })
	  .fail(function() {
		console.log( "error" );
		//since local file won't loaded because of JS security reasosns, 
		//we will invoke dynamic review function with default data which is initialized at bottom
		callbackMethod(defaultJson, containerDIV);
	  })
	  .always(function() {
		console.log( "complete" );
	  });
}

/*This function will generate individual div element based on JSON length
**It will itrate through JSON array and will create individual div
**Individual divs will be added to dynamic review container in main dom 
*/
function generateDynamicReviews(jsonData, containerDIV)
{
	var rating, date, formattedDate, review_text;
	
	for(var i=0;i<jsonData.length;i++ )
	{
		review_text = jsonData[i].review_text;
		rating = jsonData[i].rating;
		//create style class for decimal ratings e.g. 3.5 ratting need to convert to 3_half for styling purpose
		if(Number(rating)%1 !== 0)
		{
			rating = Math.floor(rating);
			rating += "_half";
		}
		//Date need to be convert to milliseconds to utilize date class functionality
		date= new Date(jsonData[i].date * 1000);
		//Create a formatted date
		formattedDate = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
		
		//construct a div element for each review with the help of JSON data
		var formattedHTML = "<div style='margin-top:300px'>\n"
		+"<a href='"+ jsonData[i].user.profile_url + "' target='_blank'><img  src='"+jsonData[i].user.avatar_url+"' class='avatar' style='float:left' alt='Reviewer avatar image'>\n"
		+ "<div class='nameAddressContainer'>\n"
		+	"<h3 style='color:#0000ff'>"+ jsonData[i].user.name + "</h3></a>\n"
		+	"<strong>" +  jsonData[i].user.location +"</strong><br>\n"
		+	"<i class='i i-common-sprite i-friend'></i> " +  jsonData[i].user.friend_count +" friends<br>\n"
		+	"<i class='i i-common-sprite i-star'></i> " +  jsonData[i].user.review_count +" reviews\n"
		+	"<h4 style='color:#cc3300'>Elite '" +  jsonData[i].user.elite_year +"</h4>\n"
		+ "</div>\n"
		+ "<div class='starCommentsContainer'>\n"
		+	"<div class='biz-rating clearfix'>\n"
		+			"<div class='rating rating--very-large'>\n"
		+				"<i class='star-img stars_"+rating+ "' title='"+ jsonData[i].rating +" star rating'></i>\n"
		+			"</div>\n"
		+		formattedDate
		+	"</div>"
		+	"<i class='i i-common i-checkin'></i> 3 checkins\n"
		+	  review_text 
		+"</div></div><br>";
		//Add div element to dynamic review container div
		containerDIV.append(formattedHTML);
	}
	
}

//default JSON object containing dummy data
var defaultJson= [{
        "rating": 2.5,
        "date": 1427241600,
        "review_text": "<p>I had great expectations considering everyone kept saying this was the best restaurant in SF. Honestly, this place is good but it's not amazing.  The 90s decor is odd and off-putting.</p><p>I had the 3 course dinner for $69. The best part of this option is that you can get whatever you want!  You can get 3 desserts, 3 appetizers, 3 meat entrees - the possibilities are endless!</p><p>I had the glazed oysters with caviar, the quail stuffed with foie gras, and the cheese. None of the food stood out, but the service was top notch. Also, a nice touch were the intermezzo small dishes served between entrees.</p>",
        "user": {
            "avatar_url": "http://www.placebear.com/60/60",
            "name": "April J",
            "profile_url": "http://google.com",
            "location": "Los Angeles, CA",
            "review_count": 912,
            "friend_count": 2361,
            "elite_year": "2015"
        }
    },
    {
        "rating": 4,
        "date": 1421020800,
        "review_text": "<p>After a full day of early drinking and &ldquo;running&rdquo; for Bay to Breakers 2012, the only obvious choice for dinner before my flight home was to eat at Gary Danko. It was already a day of excess so why not add more excess, in the form or foie gras, to dinner as well.</p><p>Did not have reservation but arrived shortly after they opened to grab at seat at the bar. In a way, bar seating is actually better because unlike the regular tables, you aren’t forced to choose a 3-4-5 course meal, you can go a la carte. I went for the 3 course and each was just as heavenly as the next.</p>",
        "user": {
            "avatar_url": "http://www.placebear.com/60/60",
            "name": "April J2",
            "profile_url": "http://google.com",
            "location": "Los Angeles, CA",
            "review_count": 45,
            "friend_count": 10,
            "elite_year": ""
        }
    },
    {
        "rating": 2,
        "date": 1424390400,
        "review_text": "<p>Can’t decide between 4 or 5 stars. I came here a year ago for my birthday and thought it was great, easily a 5 star review. I came here recently with my girlfriend for our anniversary dinner. Food was great, but unfortunately not spectacular from when I went for my first time.</p>",
        "user": {
            "avatar_url": "http://www.placebear.com/60/60",
            "name": "Diana Y",
            "profile_url": "http://google.com",
            "location": "Mountain View, CA",
            "review_count": 79,
            "friend_count": 146,
            "elite_year": ""
        }
    }
];

};