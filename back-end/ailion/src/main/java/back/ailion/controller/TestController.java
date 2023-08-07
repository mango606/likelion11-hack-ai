//package back.ailion.controller;
//
//import back.ailion.service.TestService;
//import com.amazonaws.services.s3.model.Bucket;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/test")
//public class TestController {
//
//    @Autowired
//    private TestService testService;
//
//    @PostMapping("/create")
//    public Bucket createBucket(){
//        return testService.createBucket();
//    }
//
//    @GetMapping("/test")
//    public void test(){
//        testService.test();
//    }
//}
