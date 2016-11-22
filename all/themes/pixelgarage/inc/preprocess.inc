<?php
/**
 * Created by PhpStorm.
 * User: ralph
 * Date: 06.02.15
 * Time: 17:23
 */

/**
 * Preprocess variables for the html template.
 */
function pixelgarage_preprocess_html(&$vars) {
  // make sure jQuery UI and effects is loaded for anonymous users
  drupal_add_library('system', 'ui');
  drupal_add_library('system', 'effects');

}

/**
 * Override or insert variables for the page templates.
 */
function pixelgarage_preprocess_page(&$vars) {
  // hide titles on login forms
  pg_login_preprocess_page($vars);

  // add background sound in different formats
  $sound_uri = null;
  $icon_uri = null;
  $sound_title = '';
  $sound_artist = '';

  $query = new EntityFieldQuery();
  $query->entityCondition('entity_type', 'node')
    ->entityCondition('bundle', 'background_sound')
    ->range(0, 1);
  $result = $query->execute();

  if (isset($result['node'])) {
    // get audio file path and icon
    $node = node_load(key($result['node']));
    if (!empty($node->field_sound_file)) {
      foreach ($node->field_sound_file[LANGUAGE_NONE] as $index => $file) {
        // file mime type
        $sound_mime = $file['filemime'];
        if (!empty($sound_mime)) {
          if ($sound_mime == 'audio/mpeg') $sound_mime = 'audio/mp4';
          $vars['sound_mime_' . $index] = $sound_mime;
          // file uri
          $sound_uri = $file['uri'];
          $vars['sound_src_' . $index] = !empty($sound_uri) ? file_create_url($sound_uri) : null;
        }
      }
    }
    $icon_uri = $node->field_image[LANGUAGE_NONE][0]['uri'];
    $sound_title = $node->title;
    $sound_artist = !empty($node->field_artist) ? $node->field_artist[LANGUAGE_NONE][0]['value'] : '';
  }
  $vars['sound_icon_src'] = !empty($icon_uri) ? file_create_url($icon_uri) : null;
  $vars['sound_title'] = $sound_title;
  $vars['sound_artist'] = $sound_artist;
}

