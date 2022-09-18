import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

/**
 * Project  javascript
 *
 * @author LaiShuXin
 * @time 2022/9/18 12:45
 */
public class FunctionBlock {
    public static void main(String[] args) throws ScriptException, NoSuchMethodException {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("JavaScript");


        // 公共函数。在后台配置。在运行的时候从数据库中读取，保证是最新的代码。
        /**
         *var ShopFlexUtils = {
         *     add: function (a, b) {
         *         return a + b;
         *     }
         * };
         */
        String utilScript = "var ShopFlexUtils = {\n" +
                "    add: function (a, b) {\n" +
                "        return a + b;\n" +
                "    }\n" +
                "};";


        // 从 flowBlock.jsCode 读取的脚本。
        /**
         * function main(context) {
         *   var data = ShopFlexUtils.add(1, 2)
         *   return JSON.stringify({
         *     outputs: [data, context],
         *   })
         * }
         */
        String flowBlockScripts = "function main(context) {\n" +
                "  var data = ShopFlexUtils.add(1, 2)\n" +
                "  return JSON.stringify({\n" +
                "    outputs: [data, context],\n" +
                "  })\n" +
                "}\n";
        // evaluate script

        // 避免出现类似 }function 语法错误.
        // script1 + ";;" + script2 = "  xxx  ;; xxx2" ;; 会被识别为一个空语句。
        engine.eval(utilScript + ";;" + flowBlockScripts);

        Invocable inv = (Invocable) engine;

        String executionResult = (String) inv.invokeFunction("main", "context");//This one works.
        System.out.println(executionResult);
    }
}
