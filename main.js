song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftwristscore=0;
song1status="";
songstatus2="";

function setup()
{
    canvas=createCanvas(600,450);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("model loaded!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftwristscore=results[0].pose.keypoints[9].score;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX=results[0].pose.leftWrist.x;
        rightWristY=results[0].pose.leftWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw()
{
    image(video,0,0,600,500);
    song1status=song1.isPlaying();
    fill("#dc143c");
    stroke("#dc143c");
    if(leftwristscore>0.2)
    {
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1status==false)
        {
            song1.play()
            document.getElementById("name").innerHTML="Name: Harry Potter Theme";
        }
    }
}

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
