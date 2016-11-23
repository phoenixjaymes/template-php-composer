<?php
/* 
 * File Name: index.php
 * Date: 2 Aug 16
 * Programmer: Jaymes Young
 */

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/vendor/autoload.php';

$settings =  [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];

$app = new \Slim\App($settings);

// Get container
$container = $app->getContainer();

// Register component on container
$container['view'] = function ($c) {    
    $view = new \Slim\Views\Twig('views/', [
        'cache' => false
    ]);
    
    // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $c['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($c['router'], $basePath));
    return $view;
};

// Override the default Not Found Handler
$container['notFoundHandler'] = function ($c) {
    return function ($request, $response) use ($c) {

      return $c['view']->render($response, '404.html.twig');
    };
};


// Render template in route
$app->get('/', function ($request, $response) {
    $this->view->render($response, 'index.html.twig', ['pageName' => 'home']);
})->setName('home');

// Run app
$app->run();