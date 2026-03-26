
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("===== Fake News Detection System =====");
        System.out.print("Enter news text: ");

        String input = sc.nextLine();

        try {
            ProcessBuilder pb = new ProcessBuilder(
    "python",
    "python/predict.py",
    input
);

            Process process = pb.start();

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );

           String output = reader.readLine();

System.out.println("DEBUG: " + output);

if(output == null) {
    System.out.println("Python did not return output");
    return;
}

            String[] result = output.split("\\|");

            String prediction = result[0];
            String confidence = result[1];
            String explanation = result[2];

            System.out.println("\n===== RESULT =====");
            System.out.println("Prediction: " + prediction.toUpperCase());
            System.out.println("Confidence: " + confidence + "%");
            System.out.println("Explanation: " + explanation);

            if(prediction.equalsIgnoreCase("fake"))  {
                System.out.println("⚠ Warning: This news may be misleading.");
            } else {
                System.out.println("✔ This news appears reliable.");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
