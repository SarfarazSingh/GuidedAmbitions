# Veteran Transition Platform - WordPress/Elementor Integration Guide

This guide will help you install and integrate the Veteran Transition Platform into your WordPress website using Elementor.

## Installation Instructions

### Method 1: Direct Plugin Upload (Recommended)

1. **Upload the Plugin**:
   - Go to your WordPress admin dashboard
   - Navigate to "Plugins" → "Add New"
   - Click the "Upload Plugin" button at the top
   - Select the `veteran-platform-elementor-plugin.zip` file
   - Click "Install Now"
   - After installation completes, click "Activate Plugin"

2. **Using with Elementor**:
   - Create a new page or edit an existing one with Elementor
   - Add an "HTML" or "Shortcode" widget to your page
   - Insert one of the following shortcodes:
     - `[veteran_platform]` - Full platform
     - `[veteran_skill_translator]` - Skill Translator only
     - `[veteran_resume_generator]` - Resume Generator only
     - `[veteran_ats_scanner]` - ATS Scanner only
     - `[veteran_interview_coach]` - Interview Coach only
   - You can adjust the height: `[veteran_platform height="1000px"]`
   - Save and publish your page

### Method 2: Manual Installation

If the direct upload doesn't work, you can install manually:

1. **Extract the ZIP file** on your computer

2. **Upload via FTP**:
   - Connect to your website using an FTP client
   - Navigate to `/wp-content/plugins/`
   - Upload the `veteran-platform` folder from the extracted ZIP

3. **Activate the Plugin**:
   - Go to WordPress admin → "Plugins"
   - Find "Veteran Transition Platform" and click "Activate"

4. **Use with Elementor** as described in Method 1

## Elementor-Specific Integration Tips

### Using Custom HTML Widget

For more control over the display:

1. Add an "HTML" widget to your Elementor page
2. Insert this code (adjust height as needed):
   ```html
   <div class="veteran-platform-container">
     <iframe src="/wp-content/plugins/veteran-platform/assets/index.html" style="width:100%; height:800px; border:none;"></iframe>
   </div>
   ```

### Using Elementor's Shortcode Widget

1. Add a "Shortcode" widget to your Elementor page
2. Insert your chosen shortcode
3. Use Elementor's styling options to customize the widget container

### Styling in Elementor

To style the container:

1. Add custom CSS to Elementor:
   - Edit the page with Elementor
   - Click the "Settings" icon (gear)
   - Go to "Advanced" → "Custom CSS"
   - Add styling for `.veteran-platform-container`

Example CSS:
```css
.veteran-platform-container {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    background-color: #ffffff;
}
```

## Troubleshooting

### Plugin Not Appearing

- Check that the ZIP was uploaded correctly
- Ensure the plugin was activated after installation
- Try deactivating and reactivating the plugin

### Content Not Displaying Correctly

- Check browser console for errors
- Ensure your server allows iframe embedding
- Try adjusting the height parameter in the shortcode

### Elementor Widget Issues

- Try using a different widget type (HTML vs Shortcode)
- Ensure Elementor is updated to the latest version
- Clear your browser cache and Elementor cache

## Support

If you encounter any issues with the integration, please check:
- WordPress and Elementor are updated to their latest versions
- Your server meets the minimum requirements for WordPress plugins
- Your theme is compatible with Elementor

For further assistance, you can refer to the WordPress Plugin documentation or Elementor support resources.
