<?php
/**
 * Plugin Name: Veteran Transition Platform
 * Plugin URI: https://kcmhtvwc.manus.space
 * Description: Integrates the Veteran Transition Platform with all components (Skill Translator, Resume Generator, ATS Scanner, and Interview Coach) into your WordPress site.
 * Version: 1.0.0
 * Author: Manus
 * Text Domain: veteran-platform
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class Veteran_Transition_Platform {
    
    /**
     * Constructor
     */
    public function __construct() {
        // Register activation hook
        register_activation_hook(__FILE__, array($this, 'activate'));
        
        // Register deactivation hook
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
        
        // Add shortcodes
        add_shortcode('veteran_platform', array($this, 'platform_shortcode'));
        add_shortcode('veteran_skill_translator', array($this, 'skill_translator_shortcode'));
        add_shortcode('veteran_resume_generator', array($this, 'resume_generator_shortcode'));
        add_shortcode('veteran_ats_scanner', array($this, 'ats_scanner_shortcode'));
        add_shortcode('veteran_interview_coach', array($this, 'interview_coach_shortcode'));
        
        // Enqueue scripts and styles
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        
        // Add admin menu
        add_action('admin_menu', array($this, 'add_admin_menu'));
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Create necessary directories
        $upload_dir = wp_upload_dir();
        $plugin_dir = $upload_dir['basedir'] . '/veteran-platform';
        
        if (!file_exists($plugin_dir)) {
            wp_mkdir_p($plugin_dir);
        }
        
        // Set default options
        update_option('veteran_platform_installed', true);
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Clean up if needed
    }
    
    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts() {
        // Only enqueue on pages where shortcode is used
        global $post;
        if (is_a($post, 'WP_Post') && (
            has_shortcode($post->post_content, 'veteran_platform') ||
            has_shortcode($post->post_content, 'veteran_skill_translator') ||
            has_shortcode($post->post_content, 'veteran_resume_generator') ||
            has_shortcode($post->post_content, 'veteran_ats_scanner') ||
            has_shortcode($post->post_content, 'veteran_interview_coach')
        )) {
            // Register and enqueue styles
            wp_register_style('veteran-platform-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700&display=swap');
            wp_register_style('veteran-platform-fontawesome', 'https://kit.fontawesome.com/a076d05399.js');
            wp_register_style('veteran-platform-modern-ui', plugin_dir_url(__FILE__) . 'assets/css/modern-ui.css');
            wp_register_style('veteran-platform-custom', plugin_dir_url(__FILE__) . 'assets/css/custom.css');
            
            wp_enqueue_style('veteran-platform-fonts');
            wp_enqueue_style('veteran-platform-fontawesome');
            wp_enqueue_style('veteran-platform-modern-ui');
            wp_enqueue_style('veteran-platform-custom');
            
            // Register and enqueue scripts
            wp_register_script('veteran-platform-main', plugin_dir_url(__FILE__) . 'assets/js/main.js', array('jquery'), '1.0.0', true);
            wp_register_script('veteran-platform-dropdowns', plugin_dir_url(__FILE__) . 'assets/js/animated-dropdowns.js', array('jquery'), '1.0.0', true);
            wp_register_script('veteran-platform-animations', plugin_dir_url(__FILE__) . 'assets/js/animations.js', array('jquery'), '1.0.0', true);
            
            wp_enqueue_script('veteran-platform-main');
            wp_enqueue_script('veteran-platform-dropdowns');
            wp_enqueue_script('veteran-platform-animations');
        }
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            'Veteran Platform',
            'Veteran Platform',
            'manage_options',
            'veteran-platform',
            array($this, 'admin_page'),
            'dashicons-shield',
            30
        );
    }
    
    /**
     * Admin page
     */
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>Veteran Transition Platform</h1>
            <div class="card">
                <h2>Available Shortcodes</h2>
                <p>Use these shortcodes to embed the Veteran Transition Platform in your pages or posts:</p>
                <ul>
                    <li><code>[veteran_platform]</code> - Embeds the full platform with all components</li>
                    <li><code>[veteran_skill_translator]</code> - Embeds only the Skill Translator component</li>
                    <li><code>[veteran_resume_generator]</code> - Embeds only the Resume Generator component</li>
                    <li><code>[veteran_ats_scanner]</code> - Embeds only the ATS Scanner component</li>
                    <li><code>[veteran_interview_coach]</code> - Embeds only the Interview Coach component</li>
                </ul>
            </div>
            <div class="card">
                <h2>Installation Status</h2>
                <?php if (get_option('veteran_platform_installed')): ?>
                    <p style="color: green;">✓ Plugin is properly installed and ready to use.</p>
                <?php else: ?>
                    <p style="color: red;">✗ Plugin installation is incomplete. Please deactivate and reactivate the plugin.</p>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
    
    /**
     * Full platform shortcode
     */
    public function platform_shortcode($atts) {
        // Extract attributes
        $atts = shortcode_atts(array(
            'height' => '800px',
        ), $atts);
        
        // Return iframe with full platform
        return '<div class="veteran-platform-container">
            <iframe src="' . plugin_dir_url(__FILE__) . 'assets/index.html" style="width:100%; height:' . esc_attr($atts['height']) . '; border:none;"></iframe>
        </div>';
    }
    
    /**
     * Skill Translator shortcode
     */
    public function skill_translator_shortcode($atts) {
        // Extract attributes
        $atts = shortcode_atts(array(
            'height' => '800px',
        ), $atts);
        
        // Return iframe with Skill Translator component
        return '<div class="veteran-platform-container">
            <iframe src="' . plugin_dir_url(__FILE__) . 'assets/components/skill_translator/index.html" style="width:100%; height:' . esc_attr($atts['height']) . '; border:none;"></iframe>
        </div>';
    }
    
    /**
     * Resume Generator shortcode
     */
    public function resume_generator_shortcode($atts) {
        // Extract attributes
        $atts = shortcode_atts(array(
            'height' => '800px',
        ), $atts);
        
        // Return iframe with Resume Generator component
        return '<div class="veteran-platform-container">
            <iframe src="' . plugin_dir_url(__FILE__) . 'assets/components/resume_generator/index.html" style="width:100%; height:' . esc_attr($atts['height']) . '; border:none;"></iframe>
        </div>';
    }
    
    /**
     * ATS Scanner shortcode
     */
    public function ats_scanner_shortcode($atts) {
        // Extract attributes
        $atts = shortcode_atts(array(
            'height' => '800px',
        ), $atts);
        
        // Return iframe with ATS Scanner component
        return '<div class="veteran-platform-container">
            <iframe src="' . plugin_dir_url(__FILE__) . 'assets/components/ats_scanner/index.html" style="width:100%; height:' . esc_attr($atts['height']) . '; border:none;"></iframe>
        </div>';
    }
    
    /**
     * Interview Coach shortcode
     */
    public function interview_coach_shortcode($atts) {
        // Extract attributes
        $atts = shortcode_atts(array(
            'height' => '800px',
        ), $atts);
        
        // Return iframe with Interview Coach component
        return '<div class="veteran-platform-container">
            <iframe src="' . plugin_dir_url(__FILE__) . 'assets/components/interview_coach/index.html" style="width:100%; height:' . esc_attr($atts['height']) . '; border:none;"></iframe>
        </div>';
    }
}

// Initialize the plugin
$veteran_platform = new Veteran_Transition_Platform();
