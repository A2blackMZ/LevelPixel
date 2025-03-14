<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validation des données
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'telephone' => 'required|string|max:20',
        ]);

        // Génération du code de confirmation
        $confirmation_code = Str::random(6);

        // Création de l'utilisateur
        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->mot_de_passe),
            'telephone' => $request->telephone,
            'role' => 'stagiaire',
            'confirmation_code' => $confirmation_code,
            'is_confirmed' => false,
        ]);

        // Envoi du code de confirmation par email
        Mail::send('emails.confirmation', ['code' => $confirmation_code], function ($message) use ($user) {
            $message->to($user->email);
            $message->subject('Confirmation de votre compte');
        });

        // Stockage de l'email dans la session
        session(['email' => $user->email]);

        return response()->json(['message' => 'Un code de confirmation a été envoyé à votre adresse email.'], 201);
    }

    public function confirm(Request $request)
    {
        // Validation des données
        $request->validate([
            'email' => 'required|string|email',
            'confirmation_code' => 'required|string',
        ]);

        // Vérification du code de confirmation
        $user = User::where('email', $request->email)
            ->where('confirmation_code', $request->confirmation_code)
            ->first();

        if (!$user) {
            return response()->json(['message' => 'Code de confirmation incorrect.'], 400);
        }

        // Confirmation de l'utilisateur
        $user->is_confirmed = true;
        $user->confirmation_code = null;
        $user->save();

        return response()->json(['message' => 'Votre compte a été confirmé.'], 200);
    }

    public function login(Request $request)
    {
        // Validation des données
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Vérification des informations de connexion
        $user = User::where('email', $request->email)->first();

        if (!$user || !$user->is_confirmed) {
            return response()->json(['message' => 'Les informations de connexion sont incorrectes ou le compte n\'est pas confirmé.'], 401);
        }

        // Création d'un token d'accès
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }

    public function logout(Request $request)
    {
        // Révocation du token d'accès
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie.']);
    }

}
