$(document).ready(function(){

  streams.url = {
  shawndrost:'http://jevaart.com/elcamino/skull5jan2012ftw.jpg',
  sharksforcheap:'http://jevaart.com/elcamino/skull1jan2012ftw.jpg',
  marcus: 'http://jevaart.com/elcamino/skull2jan2012ftw.jpg', 
  douglascalhoun: 'http://jevaart.com/elcamino/skull6jan2012ftw.jpg',
  };

  function newUserName () {
    var visitor= prompt("Welcome, please enter your user name");
    return visitor;
  }
  streams.visitor = newUserName();
  streams.users[streams.visitor] = [];
  streams.url[streams.visitor]='http://jevaart.com/skull2afrontw.jpg';

  //http://jevaart.com/elcamino/skull4jan2012ftw.jpg',
  //=============================================================//

  var findTime = function (timeDiff) {
    timeDiff = (timeDiff/1000);
    var history;
    
    var minsFunc = function (history, timeDiff) {
      var minutes = Math.floor(timeDiff / 60) % 60;
      timeDiff -= minutes * 60;
      return history? history + minutes + " mins ago" : minutes + " mins ago";
    };
    var hoursFunc = function (history, timeDiff) {
      var hours = Math.floor(timeDiff / 3600) % 24;
      timeDiff -= hours * 3600;
      history = history? history+hours + " hr, " : hours + " hr, ";
      return minsFunc (history, timeDiff);
    };
    var daysFunc = function (timeDiff) {
      var days = Math.floor(timeDiff / 86400);
      timeDiff -= days * 86400;
      history = days + " days, ";
      return hoursFunc (history, timeDiff);
      };
    
      if (timeDiff >= 86400) { return daysFunc(timeDiff);}
      if (timeDiff >= 3600) { return hoursFunc(0, timeDiff);}
      if (timeDiff >= 60) {return minsFunc(0, timeDiff);}
      return "a few secs ago";
  };

  //=============================================================//

  var catchLastIndex = function () {
      $(".notifUpdate").remove();

      var $tweetChecking = $('<div class="notifUpdate" ></div>');
      $tweetChecking.text(streams.home.length - streams.userLastRefresh + " unread tweets");
      $tweetChecking.prependTo($(".stream-items-ol"));
  };

  //=============================================================//
  loadTweets();

  function loadTweets (userId) {
    if(!userId){
      document.getElementById("changeTxt").innerHTML="";
    } else {
      document.getElementById("changeTxt").innerHTML=userId +"'s ";
    }
          //save reference to ordered list; & delete content of ol
    var $messgFeed = $(".stream-items-ol");
    $messgFeed.html('');

    var index;
    var homeOrUserObj;

          //array of newTweet
    if (!userId){
      index = streams.home.length - 1;
      homeOrUserObj = streams.home;
      streams.userLastRefresh = index;
    } else {
      index = streams.users[userId].length-1;
      homeOrUserObj = streams.users[userId];
    }

    if(index>=10) {
      maxCount = 10;
    } else {
      maxCount=(index);
    }

    var runCount=0;

    while (runCount <= maxCount) {
      tweet = homeOrUserObj[index];
      var $tweet = $('<li class="stream-items-li"></li>');

      $tweet.html('<div class="profileImgWrap"><img src='+ streams.url[tweet.user] +' alt=""/></div><div class="tweetTextWrap">@<span class="userName">' +tweet.user +'</span>:<span class="timeLogged">[' + findTime(new Date().getTime() - tweet.created_at.getTime())+ ']</span></br><span class="messTxt">' + tweet.message + '</span></div><div class="clear"></div>');

      $tweet.appendTo($messgFeed);

      index--;
      runCount++;
    }
  }
  //"http://sanityofficeservices.com/wp-content/uploads/2013/03/Private-Blank-Profile-Image.png"
  //=============================================================//

  $(".tweetTarget").click(function(){loadTweets();});       // tweeter bird
  $(".homeTarget").click(function(){loadTweets();});        // home button
  $(".notifTarget").click(function(){catchLastIndex();});   // notif button
  $(".myTweets").click(function(){loadTweets(streams.visitor);});   // me
  $(".alertTarget").click(function(){alert('Hi ' + streams.visitor + ',\nyou have 0 new private messages.\nThanks for checking in.');});

  //=============================================================//
  $(document).on('click', '.notifUpdate', function(){
    catchLastIndex();
    
  });
  //=============================================================//
  
  $(document).on('click', '.stream-items-li', function(){

    var txt = $(this).text();
    var userId = txt.slice(1,txt.indexOf(":"));
    //document.getElementById("changeTxt").innerHTML=userId +" ";
    loadTweets(userId);
  });

  //=============================================================//

  $(".form-control").keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      var clickInput = $(".form-control").val();
      writeTweet(clickInput);
      $(".form-control").val('');
      loadTweets();
    }
  });
  //=============================================================//



});
