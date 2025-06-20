# WordPress Integration Instructions for Veteran Transition Platform

This guide will walk you through integrating the Veteran Transition Platform into your WordPress website using a custom plugin. This method maintains the original appearance and functionality of all components while making them accessible through your WordPress site.

## Step 1: Prepare the Plugin Structure

1. Create a new folder named `veteran-platform` in your WordPress site's `/wp-content/plugins/` directory.

2. Inside this folder, create the following structure:
   ```
   veteran-platform/
   ├── veteran-platform.php
   └── assets/
       ├── css/
       ├── js/
       ├── images/
       └── components/
           ├── skill_translator/
           ├── resume_generator/
           ├── ats_scanner/
           └── interview_coach/
   ```

## Step 2: Copy the Plugin Files

1. Copy the `veteran-platform.php` file (which I've provided) to the root of your `veteran-platform` folder.

2. Extract the `veteran_platform_code.zip` file (which I provided earlier) to a temporary location.

3. Copy all files from the extracted zip to the `assets` folder as follows:
   - Copy all CSS files to `assets/css/`
   - Copy all JS files to `assets/js/`
   - Copy all image files to `assets/images/`
   - Copy the `index.html` file to `assets/`
   - Copy each component folder to `assets/components/`

## Step 3: Modify File References

1. Open each HTML file (including `index.html` and all component HTML files) and update file references to use relative paths:
   - Change `../../css/` to `../css/` in component HTML files
   - Change `../../js/` to `../js/` in component HTML files
   - Change `../../images/` to `../images/` in component HTML files

2. Alternatively, you can use the plugin's URL function in the PHP file to handle paths automatically (this is already set up in the provided PHP file).

## Step 4: Activate the Plugin

1. Log in to your WordPress admin dashboard.

2. Navigate to "Plugins" → "Installed Plugins".

3. Find "Veteran Transition Platform" in the list and click "Activate".

4. You should now see a new "Veteran Platform" menu item in your WordPress admin sidebar.

## Step 5: Use the Shortcodes

The plugin provides several shortcodes to embed the platform or individual components:

1. To embed the full platform on any page or post:
   ```
   [veteran_platform]
   ```

2. To embed specific components:
   ```
   [veteran_skill_translator]
   [veteran_resume_generator]
   [veteran_ats_scanner]
   [veteran_interview_coach]
   ```

3. You can adjust the height of the embedded iframe:
   ```
   [veteran_platform height="1000px"]
   ```

## Step 6: Create Pages for Each Component

1. Create a new page in WordPress for each component (or a single page for the full platform).

2. Add the appropriate shortcode to each page.

3. Publish the pages and add them to your site's navigation menu.

## Troubleshooting

### File Permissions
- Ensure all files have proper read permissions (typically 644 for files and 755 for directories).

### Cross-Origin Issues
- If you encounter cross-origin errors, you may need to add appropriate headers to your server configuration.

### Script Loading
- If scripts aren't loading properly, check browser console for errors and ensure paths are correct.

### WordPress Compatibility
- This plugin has been tested with WordPress 5.8+. If you're using an older version, you may need to modify the code.

## Advanced Customization

### Styling the Container
You can add custom CSS to style the container div that holds the iframe:

```css
.veteran-platform-container {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

### Adjusting for WordPress Theme
If you need to make adjustments to fit your WordPress theme, you can add custom CSS either through your theme's customizer or by adding it to the plugin's CSS files.

### Adding Custom JavaScript
If you need to add custom JavaScript to interact with the platform, you can modify the plugin's JS files or add new ones and enqueue them in the plugin's PHP file.

## Support and Updates

If you need assistance with the integration or want to update the platform in the future:

1. To update, simply replace the files in the `assets` directory with the new versions.
2. If the structure changes significantly, you may need to update the PHP file as well.

Remember to back up your plugin directory before making any updates.
