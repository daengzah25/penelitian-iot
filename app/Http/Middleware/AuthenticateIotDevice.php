<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\IotDevice;

class AuthenticateIotDevice
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('X-Device-Token');

        $device = IotDevice::where('api_token', $token)->first();

        if (!$token || !$device) {
            abort(401, 'Invalid device token');
        }

        $device->update(['last_seen_at' => now()]);
        $request->merge(['iot_device' => $device]);

        return $next($request);
    }
}
