/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// other variables can be in here too
// these control the colors used
bg_color = [225, 206, 187];
fg_color = [151, 102, 52];
stroke_color = [95, 52, 8];

function FaceMap() {
  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    fill(0, 0, 255);
    var box = bounding_box(positions);
    rect(box[0], box[1], box[2], box[3]);      

    var nose_pos = average_point(positions.nose_bridge);
    var eye1_pos = average_point(positions.left_eye);
    var eye2_pos = average_point(positions.right_eye);
    var half_height = positions.chin[7][1] - nose_pos[1];
    var face_width = positions.chin[positions.chin.length-1][0] - positions.chin[0][0];

    var x = nose_pos[0];
    var y = nose_pos[1];
    var w = 2 * face_width;
    var h = 2.5 * half_height;

    var extent = 0;
    if(h < w) {
      extent = h / 2;
    }
    else {
      extent = w / 2;
    }
    var scale = extent / 220.0;

    // Uncomment to see drawing area
    // fill(255);
    // stroke(0);
    // rect(x-w/2, y-h/2, w, h);
    // fill(0)
    // ellipse(x, y, w, h);

    // head
    stroke(stroke_color);
    fill(fg_color);
    beginShape();
    for(var i=0; i<positions.chin.length;i++) {
      vertex(positions.chin[i][0], positions.chin[i][1]);
    }
    for(var i=positions.right_eyebrow.length-1; i>=0;i--) {
      vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
    }
    for(var i=positions.left_eyebrow.length-1; i>=0;i--) {
      vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);
    }
    endShape(CLOSE);

    // mouth
    noStroke();
    fill(bg_color);
    beginShape();
    for(var i=0; i<positions.top_lip.length;i++) {
      vertex(positions.top_lip[i][0], positions.top_lip[i][1]);
    }
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.bottom_lip.length;i++) {
      vertex(positions.bottom_lip[i][0], positions.bottom_lip[i][1]);
    }
    endShape(CLOSE);

    fill(255, 0, 0);
    // print(positions.bottom_lip.length);
    // for(var i=6; i<positions.bottom_lip.length;i++) {
    //   ellipse(positions.bottom_lip[i][0], positions.bottom_lip[i][1], 5, 5);
    // }
    // fill(0, 255, 0);
    // print(positions.top_lip.length);
    // for(var i=6; i<positions.top_lip.length;i++) {
    //   ellipse(positions.top_lip[i][0], positions.top_lip[i][1], 5, 5);
    // }
    beginShape();
    for(var i=6; i<positions.bottom_lip.length;i++) {
      vertex(positions.bottom_lip[i][0], positions.bottom_lip[i][1]);
    }
    for(var i=6; i<positions.top_lip.length;i++) {
      vertex(positions.top_lip[i][0], positions.top_lip[i][1]);
    }
    endShape(CLOSE);
    fill(bg_color);


    // nose
    beginShape();
    vertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]);
    for(var i=0; i<positions.nose_tip.length;i++) {
      vertex(positions.nose_tip[i][0], positions.nose_tip[i][1]);
    }
    endShape(CLOSE);

/*
    // eyes
    beginShape();
    for(var i=0; i<positions.left_eye.length;i++) {
      vertex(positions.left_eye[i][0], positions.left_eye[i][1]);
    }
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.right_eye.length;i++) {
      vertex(positions.right_eye[i][0], positions.right_eye[i][1]);
    }
    endShape(CLOSE);

*/
    fill(255);
    ellipse(eye1_pos[0], eye1_pos[1], 25 * scale, 25 * scale);
    ellipse(eye2_pos[0], eye2_pos[1], 16 * scale, 16 * scale);

    fill(stroke_color);
    beginShape();
    for(var i=0; i<positions.right_eyebrow.length; i++) {
      vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
    }
    endShape(CLOSE);
    beginShape();
    for(var i=0; i<positions.left_eyebrow.length; i++) {
      vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);
    }
    endShape(CLOSE);
    strokeWeight(1);  
  }
}

// given a point, return the average
function average_point(list) {
  var sum_x = 0;
  var sum_y = 0;
  var num_points = 0;
  for(var i=0; i<list.length; i++) {
    sum_x += list[i][0];
    sum_y += list[i][1];
    num_points += 1; 
  }
  return [sum_x / num_points, sum_y / num_points];
}

function bounding_box(positions) {
  var xmin=null, xmax=null, ymin=null, ymax=null;
  for (var key in positions) {
    var part = positions[key];
    for (var i=0; i<part.length; i++) {
      if(xmin == null || xmin < part[i][0]) {
        xmin = part[i][0];
      }
      if(ymin == null || ymin < part[i][1]) {
        ymin = part[i][1];
      }
      if(xmax == null || xmax > part[i][0]) {
        xmax = part[i][0];
      }
      if(ymax == null || ymax > part[i][1]) {
        ymax = part[i][1];
      }
    }
  }

  // return [x1, y1, x2, y2];
  return [xmax, ymax, xmin-xmax, ymin-ymax];
}