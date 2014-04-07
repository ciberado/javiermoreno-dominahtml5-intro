package com.javiermoreno.phonegap;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.telephony.TelephonyManager;

public class InfoTelefonoPlugin extends CordovaPlugin  {

	public static final String ACCION_OBTENER_TELEFONO = "ACCION_OBTENER_TELEFONO";
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		try {
			if (ACCION_OBTENER_TELEFONO.equals(action) == true) {
				// long a0 = args.getLong(0);
				TelephonyManager manager =(TelephonyManager) 
						super.cordova.getActivity()
						     .getSystemService(Context.TELEPHONY_SERVICE);
 			    String numero = manager.getLine1Number();
 			    String imsi = manager.getSubscriberId();
 			    String imei = manager.getDeviceId();
 			    String resultado = "{ 'numero': '{0}', " +
 			    		           "  'imsi'  : '{1}', " +
 			    		           "  'imei'  : '{2}' " +
 			    		           "}"; 

 			    JSONObject resultadoJSON = new JSONObject(
 			    		resultado.replaceAll("'", "\"")
 			                     .replace("{0}", numero)
 			                     .replace("{1}", imsi)
 			                     .replace("{2}", imei)
 			                     );
 			    
 			    callbackContext.sendPluginResult(
 			    		new PluginResult(PluginResult.Status.OK, resultadoJSON));
				
				
			} else {
				callbackContext.error("Acción no reconocida.");
		    }
		} catch (RuntimeException exc) {
			callbackContext.error(exc.getMessage());
		}
	    return false;
	}	
	
}
