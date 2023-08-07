//package back.ailion.service;
//
//import com.amazonaws.ClientConfiguration;
//import com.amazonaws.auth.AWSCredentials;
//import com.amazonaws.auth.AWSStaticCredentialsProvider;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.client.builder.AwsClientBuilder;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.AmazonS3ClientBuilder;
//import com.amazonaws.services.s3.model.Bucket;
//import org.springframework.stereotype.Service;
//
//@Service
//public class TestService {
//
//    final String endPoint = "https://kr.object.ncloudstorage.com";
//    final String regionName = "kr-standard";
//    final String accessKey = "QEHyLagTdadMDvtKmj7s";
//    final String secretKey = "VWQgtAGbqQoA59Tr71PiZSjX2DoOi7SrNEwcLpF3";
//
//    // S3 client
//    final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
//            .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endPoint, regionName))
//            .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
//            .build();
//
//    public Bucket createBucket() {
//        Bucket newBucket = s3.createBucket("ailion");
//        return newBucket;
//    }
//
//    public void test(){
//        System.out.println(s3.getBucketAcl("sample-ai-project"));
//    }
//
//}
