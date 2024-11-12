<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Contenido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ContenidoController extends Controller
{
   
    public function index(Request $request)
    {
        $listaContenidos = Contenido::all();
    
   
        if ($listaContenidos->isEmpty()) {
            return response()->json(['message' => 'No se encontraron contenidos'], 404);
        }
    
        
        if ($request->is('api/*') || $request->wantsJson()) {
            return response()->json(['contenidos' => $listaContenidos], 200);
        }
    
       
        return response()->json(['contenidos' => $listaContenidos], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'titulo' => 'required',
            'video_incrustado' => 'required',
        ]);

        
        if ($validator->fails()) {
            if ($request->is('api/*') || $request->wantsJson()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }
        }

        
        $validated = $validator->validated();
        
        $descripcion = $request->descripcion ?? '';

      
        $contenido = Contenido::create([
            'titulo' => $validated['titulo'],
            'descripcion' => $descripcion,
            'video_incrustado' => $validated['video_incrustado']
        ]);

     
        return response()->json(['message' => 'Contenido creado con éxito', 'contenido' => $contenido], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $descripcion = '';
        if($request->descripcion !=''||$request->descripcion != null){
            $descripcion = $request->descripcion;
        }

        $query = Contenido::find($id);

        if($query){
            $query->update([
                'titulo' => $request->titulo,
                'descripcion' => $descripcion,
                'video_incrustado' => $request->video_incrustado
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $contenido = Contenido::find($id);
        $contenido -> delete();
    }
}
