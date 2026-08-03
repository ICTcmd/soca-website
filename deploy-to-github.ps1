# Deployment Script for SOCA Website
# This script initializes Git and prepares for GitHub deployment

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SOCA WEBSITE - GITHUB DEPLOYMENT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit
}

Write-Host ""

# Check if already initialized
if (Test-Path ".git") {
    Write-Host "⚠ Git repository already initialized" -ForegroundColor Yellow
    $response = Read-Host "Do you want to re-initialize? (y/n)"
    if ($response -eq "y") {
        Remove-Item -Path ".git" -Recurse -Force
        Write-Host "✓ Removed existing Git repository" -ForegroundColor Green
    } else {
        Write-Host "Skipping Git initialization" -ForegroundColor Yellow
    }
}

# Initialize Git
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git initialized" -ForegroundColor Green
}

Write-Host ""

# Add all files
Write-Host "Adding all files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files added" -ForegroundColor Green

Write-Host ""

# Create commit
$commitMessage = "SOCA Website 2026 - Complete with video and 127 slides"
Write-Host "Creating commit..." -ForegroundColor Yellow
git commit -m "$commitMessage"
Write-Host "✓ Commit created" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. CREATE GITHUB REPOSITORY:" -ForegroundColor Yellow
Write-Host "   - Go to: https://github.com/new" -ForegroundColor White
Write-Host "   - Repository name: soca-website-2026" -ForegroundColor White
Write-Host "   - Make it PUBLIC" -ForegroundColor White
Write-Host "   - Don't add README" -ForegroundColor White
Write-Host "   - Click 'Create repository'" -ForegroundColor White
Write-Host ""

Write-Host "2. ENTER YOUR GITHUB USERNAME:" -ForegroundColor Yellow
$username = Read-Host "   GitHub username"

if ($username) {
    Write-Host ""
    Write-Host "3. PUSHING TO GITHUB:" -ForegroundColor Yellow
    
    $remoteUrl = "https://github.com/$username/soca-website-2026.git"
    
    # Check if remote already exists
    $existingRemote = git remote get-url origin 2>$null
    if ($existingRemote) {
        Write-Host "   Updating remote URL..." -ForegroundColor Cyan
        git remote set-url origin $remoteUrl
    } else {
        Write-Host "   Adding remote URL..." -ForegroundColor Cyan
        git remote add origin $remoteUrl
    }
    
    Write-Host "   Setting branch to main..." -ForegroundColor Cyan
    git branch -M main
    
    Write-Host "   Pushing to GitHub..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   ⚠ You may be prompted for GitHub credentials" -ForegroundColor Yellow
    Write-Host ""
    
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  ✓ SUCCESS! CODE PUSHED TO GITHUB!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your repository: https://github.com/$username/soca-website-2026" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "4. DEPLOY TO VERCEL:" -ForegroundColor Yellow
        Write-Host "   - Go to: https://vercel.com" -ForegroundColor White
        Write-Host "   - Login with GitHub" -ForegroundColor White
        Write-Host "   - Click 'Add New Project'" -ForegroundColor White
        Write-Host "   - Import 'soca-website-2026'" -ForegroundColor White
        Write-Host "   - Click 'Deploy'" -ForegroundColor White
        Write-Host "   - Wait 2-3 minutes" -ForegroundColor White
        Write-Host "   - Your site is LIVE! 🎉" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Red
        Write-Host "  ✗ PUSH FAILED" -ForegroundColor Red
        Write-Host "========================================" -ForegroundColor Red
        Write-Host ""
        Write-Host "Common issues:" -ForegroundColor Yellow
        Write-Host "- Make sure you created the GitHub repository first" -ForegroundColor White
        Write-Host "- Check your GitHub username is correct" -ForegroundColor White
        Write-Host "- Verify you have internet connection" -ForegroundColor White
        Write-Host "- You may need to authenticate with GitHub" -ForegroundColor White
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "Skipping GitHub push. Run this script again when ready!" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
