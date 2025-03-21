import { useEffect, useRef } from "react";
import carImageSrc from "../../site-images/temp-racecar.png";
import roadImageSrc from "../../site-images/Game/road.png";
import sunImageSrc from "../../site-images/Game/sun.png";
import sunsetImageSrc from "../../site-images/Game/sunset-background.png";
import cloudImageSrc from "../../site-images/Game/clouds-A.png";
import groundImageSrc from "../../site-images/Game/ground.png";
import mountainImageSrc from "../../site-images/Game/mountains.png";

function GameCanvas({ activeQuestionIndex, questionsInSet, showWinMessage }) {
  const canvasRef = useRef(null);

  const racecarPosition = useRef(0);
  const targetPosition = useRef(0);
  const carImage = useRef(new Image());
  const travelDistance = 0.75; // Adjust this value to control the distance the car travels each time
  const carSpeed = 0.02; // Adjust this value to control the "speed" of the car (lerp speed)

  const sunImage = useRef(new Image());
  const sunsetImage = useRef(new Image());
  const cloudImage = useRef(new Image());
  const cloudImage2 = useRef(new Image());
  const cloudImage3 = useRef(new Image());
  const groundImage = useRef(new Image());
  const roadImage = useRef(new Image());
  const mountainImage = useRef(new Image());

  const sunPosition = useRef(0);
  const sunsetPosition = useRef(0);
  const cloudPosition = useRef(0);
  const cloudPosition2 = useRef(0);
  const cloudPosition3 = useRef(0);
  const groundPosition = useRef(0);
  const roadPosition = useRef(0);
  const mountainPosition = useRef(0);

  const sunSpeed = 0.0;
  const sunsetSpeed = 0.2;
  const cloudSpeed = 0.2;
  const cloudSpeed2 = 0.4;
  const cloudSpeed3 = 0.8;
  const groundSpeed = 0.5;
  const roadSpeed = 0.6;
  const mountainSpeed = 0.1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load images
    carImage.current.src = carImageSrc;
    sunImage.current.src = sunImageSrc;
    sunsetImage.current.src = sunsetImageSrc;
    cloudImage.current.src = cloudImageSrc;
    cloudImage2.current.src = cloudImageSrc;
    cloudImage3.current.src = cloudImageSrc;
    groundImage.current.src = groundImageSrc;
    roadImage.current.src = roadImageSrc;
    mountainImage.current.src = mountainImageSrc;

    // Function to draw the layers
    const drawLayer = (image, position, speed, y, height, loops) => {
      const width = image.naturalWidth * (height / image.naturalHeight);
      for (let i = 0; i < loops; i++) {
        ctx.drawImage(image, position + i * (width - 1), y, width, height);
      }
      position -= speed;
      if (position <= -width) {
        position += width;
      }
      return position;
    };

    // Function to draw the racecar
    const drawRacecar = () => {
      const carWidth = carImage.current.naturalWidth;
      const carHeight = carImage.current.naturalHeight;
      const aspectRatio = carWidth / carHeight;
      const height = 50;
      const width = height * aspectRatio;
      ctx.drawImage(carImage.current, racecarPosition.current, 250, width, height);
    };

    // Function to draw the win message
    const drawWinMessage = () => {
      ctx.fillStyle = "black";
      ctx.font = "48px Arial";
      ctx.fillText("You Win!", canvas.width / 2 - 100, canvas.height / 2);
    };

    // Function to update the canvas
    const updateCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sunsetPosition.current = drawLayer(sunsetImage.current, sunsetPosition.current, sunsetSpeed, 0, 300, 2);
      sunPosition.current = drawLayer(sunImage.current, sunPosition.current, sunSpeed, 0, 200, 2);
      cloudPosition.current = drawLayer(cloudImage.current, cloudPosition.current, cloudSpeed, 15, 50, 8);
      mountainPosition.current = drawLayer(mountainImage.current, mountainPosition.current, mountainSpeed, 0, 350, 2);
      cloudPosition2.current = drawLayer(cloudImage2.current, cloudPosition2.current, cloudSpeed2, 50, 100, 4);
      cloudPosition3.current = drawLayer(cloudImage3.current, cloudPosition3.current, cloudSpeed3, 75, 200, 3);
      groundPosition.current = drawLayer(groundImage.current, groundPosition.current, groundSpeed, -40, 400, 2);
      roadPosition.current = drawLayer(roadImage.current, roadPosition.current, roadSpeed, -65, 400, 2);
      drawRacecar();
      if (showWinMessage) {
        drawWinMessage();
      }
    };

    // Linear interpolation function for smooth movement
    const lerp = (start, end, t) => {
      return start * (1 - t) + end * t;
    };

    // Animation function to update the racecar and road position
    const animate = () => {
      const carWidth = carImage.current.naturalWidth;
      // Calculate the target position based on the active question index
      targetPosition.current = (activeQuestionIndex / questionsInSet) * (canvas.width + carWidth * 2) * travelDistance; // Adjust travel distance
      // Smoothly interpolate the racecar position
      racecarPosition.current = lerp(racecarPosition.current, targetPosition.current, carSpeed);

      updateCanvas();
      requestAnimationFrame(animate);
    };

    // Start the animation once the car image is loaded
    carImage.current.onload = () => {
      animate();
    };
  }, [activeQuestionIndex, questionsInSet, showWinMessage]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="GameCanvas"
      id="GameCanvas"
      width="600"
      height="350"
      style={{ backgroundColor: "black" }}
    ></canvas>
  );
}

export default GameCanvas;
