<?php

/*
 *  Reads the Schemer logo and creates a CSV with X, Y coordinate pairs.
 *  
 *  Steps:
 *  - open Schemer's logo from G+ with Gimp (schemer-logo.jpg)
 *  - use the fuzzy select tool to get the moustache
 *  - copy and paste as new image (moustache.png)
 *  - scale down at will to reduce the number of generated pairs
 *  - execute script and redirect output > logo.csv
 */

/*
 * This removes some random pixels, it makes the output look less like a
 * grid, and smaller
 */
function no_neighbor($added, $x, $y) {
	foreach ($added as $pair) {
		if (// We already printed the previous pixel
			($pair['x'] == $x && $pair['y'] == $y - 1) ||
			// We already printed the pixel above
			($pair['x'] == $x - 1 && $pair['y'] == $y)) {
			// Remove only half of those
			return (rand(0, 1) == 0 ? true : false);
		}
	}
	
	return true;
}

$path = "moustache.png";
$im = imagecreatefrompng($path);

$width = imagesx($im);
$height = imagesy($im);
$total_pixels = $width * $height;

echo "x,y\n";

$solid = 0;
$added = array();
for ($x = 0; $x < $width; $x++) {
	for ($y = 0; $y < $height; $y++) {
		$rgb = imagecolorat($im, $x, $y);
		$colors = imagecolorsforindex($im, $rgb);
		list($red, $green, $blue, $alpha) = array_values($colors);
		if ($red || $green || $blue || !$alpha) {
			if (no_neighbor($added, $x, $y)) {
				$solid++;
				$added[] = array('x'=>$x, 'y'=>$y);
				// All coordinates normalized
				echo sprintf("%f,%f\n", 1.0 * $x / $width, 1.0 * $y / $height);
			}
		}
	}
}

/*
 * Total pixels = 4814
 * Solid pixels = 906 (19%)
 * Scale (width/height) = 5.7241379310345
 */

$percentage = round(100.0 * $solid / $total_pixels);
$scale = 1.0 * $width / $height;
file_put_contents('php://stderr', "Total pixels = $total_pixels\n");
file_put_contents('php://stderr', "Solid pixels = $solid ($percentage%)\n");
file_put_contents('php://stderr', "Scale (width/height) = $scale\n");
