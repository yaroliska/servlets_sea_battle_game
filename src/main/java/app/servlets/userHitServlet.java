package app.servlets;



import com.sun.xml.internal.ws.policy.privateutil.PolicyUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/userHitServlet")
public class userHitServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException  {
        String s = "{\"current\":1,\"rowCount\": 10,\"rows\":[{\"id\":19,\"sender\":\"test.de\",\"received\":\"2014-05-30T22:15:00\"},{\"id\": 14,\"sender\":\"test.de\",\"received\":\"2014-05-30T20:15:00\"},],\"total\":2}";


        resp.setContentType("application/json");
// Get the printwriter object from response to write the required json object to the output stream
        PrintWriter out = resp.getWriter();
// Assuming your json object is **jsonObject**, perform the following, it will return your json object

        out.flush();
    }
}
