<%-- 
    Document   : savebinding
    Created on : Feb 8, 2014, 7:55:57 PM
    Author     : Alex O'Ree
/*
 * Copyright 2001-2008 The Apache Software Foundation.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
--%>

<%@page import="org.apache.juddi.webconsole.resources.ResourceLoader"%>
<%@page import="org.apache.juddi.webconsole.hub.UddiHub"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%

        if (request.getMethod().equalsIgnoreCase("POST")) {
                UddiHub x = UddiHub.getInstance(application, request.getSession());
                String msg = (x.SaveBindingTemplate(request));
                if (msg.contains(ResourceLoader.GetResource(session, "errors.generic"))) {
                        response.setStatus(406);
                }
                out.write(msg);
        }

%>