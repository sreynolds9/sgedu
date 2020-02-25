<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'stepha32_wp445' );

/** MySQL database username */
define( 'DB_USER', 'stepha32_wp445' );

/** MySQL database password */
define( 'DB_PASSWORD', '4l!7)Sp4i4' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'f1j1plsumnahtnjrn5h4w82l5ecmhhbrffxcpqknjfksdz0kwnq98m4meq9hkv5n' );
define( 'SECURE_AUTH_KEY',  'wgwdn6it2br4yn3rha62ejcqhjpsnhvmudtbxnsiay2xy3wwhiuppgxhxb78lsmk' );
define( 'LOGGED_IN_KEY',    'zcx9tv7mkqenk2w3zqw4dgtn0uingydto4zhzeajzngjihs4zgnorazfjlab8snj' );
define( 'NONCE_KEY',        'hke884t8nrgyksu6m0k8a4ijvyqp8egegtqp45qd4ifiv6rf0qneygngniubv0db' );
define( 'AUTH_SALT',        'm2m2jhfsw5dz7kfsya4n6xahl7e0oe05wampyvkc7fmr3tlbrsk2rgxvp0nvahlm' );
define( 'SECURE_AUTH_SALT', 'po3yox240vikbcok4xqlboykimjums8xldkplmpvqwhf0wkg1dts5ljf5sckbhv0' );
define( 'LOGGED_IN_SALT',   'fv4z3fqdtzukz14ibe9njv33h7cv2axvkt0w7fxyd2q2a6ubuhddhsacwdjbsjst' );
define( 'NONCE_SALT',       'uu7xdap7wrdynoja6faivomwn0ju9dqx4fy0h7qpuvvnvwo0rlnvxsekpo9vtlma' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'invgrp2020_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );

@include_once('/var/lib/sec/wp-settings.php'); // Added by SiteGround WordPress management system

