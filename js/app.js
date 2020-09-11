/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
	
	var connected = false;
	var colorPicker;
	var socket;
	
    function connected_event() {
    	console.log('Connected');
    	connected = true;
    }
    
    function color_change(color) {
		console.log(color.rgb);
		if(connected) {
			socket.emit('rgb_churras', colorPicker.color.rgb);
			console.log('Emitted');
		}
	}
	
    /**
     * Initiates the application.
     * @private
     */
    function init() {
    	colorPicker = new iro.ColorPicker('#picker', {
		  width: window.innerWidth,
		  margin: 0,
		  layout: [
		           { 
		             component: iro.ui.Wheel,
		             options: {}
		           },
		         ]
		});
    	
    	colorPicker.on('input:change', color_change);
    	
    	
        socket = io('http://192.168.100.10');
        socket.on('connect', connected_event);
    }

    window.onload = init();
}());