objects=[];
status="";
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        objectDetector.detect(video,gotResults);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Object detected...";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are: "+objects.length;
            stroke(r,g,b);
            fill(r,g,b);
            percent=floor(objetcs[i].confidence*100);
            noFill();
            text(objects[i].label+" "+percent+"% ",objects[i].x,objects[i].y);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function preload(){
    
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
}
function modelLoaded(){
    console.log("Model loaded");
    status=true;
    objectDetector.detect(video,gotResults);
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;

}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects...";

}