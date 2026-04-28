<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: "1.0.0",
    title: "Dash-Ichthys API Documentation",
    description: "L5 Swagger API description"
)]
abstract class Controller
{
    #[OA\Get(
        path: "/api/health",
        summary: "API Health Check",
        tags: ["System"],
        responses: [
            new OA\Response(response: 200, description: "OK")
        ]
    )]
    public function healthCheck() {
        return response()->json(['status' => 'ok']);
    }
}
