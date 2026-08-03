# Script to rename and move slideshow images to proper format
# This will rename all images to: slide-001.jpg, slide-002.jpg, etc.

$sourceFolder = "slideshow"
$destinationFolder = "assets\slides"

# Get all jpg files and sort them numerically
$files = Get-ChildItem -Path $sourceFolder -Filter *.jpg | Sort-Object { 
    # Extract number from filename (handles both "slide1.jpg" and "1.jpg")
    $num = $_.Name -replace '\D',''
    if ($num) { [int]$num } else { 0 }
}

Write-Host "Found $($files.Count) images in slideshow folder" -ForegroundColor Green
Write-Host "Renaming and moving to $destinationFolder..." -ForegroundColor Yellow
Write-Host ""

$counter = 1
foreach ($file in $files) {
    $newName = "slide-{0:D3}.jpg" -f $counter
    $destinationPath = Join-Path $destinationFolder $newName
    
    # Copy (not move) so originals are preserved
    Copy-Item -Path $file.FullName -Destination $destinationPath -Force
    
    Write-Host "[$counter/$($files.Count)] $($file.Name) -> $newName" -ForegroundColor Cyan
    $counter++
}

Write-Host ""
Write-Host "✓ Complete! All $($files.Count) slides renamed and copied to $destinationFolder" -ForegroundColor Green
Write-Host "✓ Original files preserved in 'slideshow' folder" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Check the assets\slides folder to verify" -ForegroundColor White
Write-Host "2. Test your website by opening index.html" -ForegroundColor White
Write-Host "3. If everything works, you can delete the 'slideshow' folder" -ForegroundColor White
