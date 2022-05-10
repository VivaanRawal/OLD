song="";
song1="";
function preload(){
    song=loadSound("music.mp3");
    song1=loadSound("music2.mp3");
}

rightWristX=0;
rightWristY=0;
scoreRightWrist=0;

leftWristX=0;
leftWristY=0;
scoreLeftWrist=0;


function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
 
}
function modelLoaded(){
    console.log('PoseNet is Initialized');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("RightWristX= " +rightWristX+ "RightWristY= "+rightWristY);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("LeftWristX= " +leftWristX+ "LeftWristY= "+leftWristY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist= " + scoreLeftWrist+ "scoreRightWrist= " + scoreRightWrist);

    }
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        if(song1.isPlaying()==true){
            song1.stop();
            song.play();
        }
        if(scoreRightWrist>0.2){
            circle(RightWristX,RightWristY,20);
            if(song.isPlaying()==true){
                song.stop();
                song1.play();
            }
    }
}}