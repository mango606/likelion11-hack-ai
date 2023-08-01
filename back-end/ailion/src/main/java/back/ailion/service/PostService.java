package back.ailion.service;

import back.ailion.model.dto.request.PostRequestDto;
import back.ailion.model.dto.request.PostUpdateRequestDto;
import back.ailion.model.entity.Member;
import back.ailion.model.entity.Post;
import back.ailion.model.dto.PostDto;
import back.ailion.model.dto.Result;
import back.ailion.repository.MemberRepository;
import back.ailion.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    private PostDto PostToPostDto(Post post) {
        return new PostDto(post);
    }

    @Transactional
    public PostDto savePost(PostRequestDto postRequestDto) {

        Member member = memberRepository.findById(postRequestDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("Could not found member id : " + postRequestDto.getMemberId()));

        Post post = Post.builder()
                .member(member)
                .content(postRequestDto.getContent())
                .title(postRequestDto.getTitle())
                .writer(postRequestDto.getWriter())
                .commentCount(0)
                .likeCount(0)
                .viewCount(0)
                .build();

        return PostToPostDto(postRepository.save(post));
    }

    @Transactional
    public PostDto updatePost(PostUpdateRequestDto updateDto) {

        Post post = postRepository.findById(updateDto.getPostId())
                .orElseThrow(() -> new RuntimeException("Could not found post id : " + updateDto.getPostId()));

        post.setTitle(updateDto.getTitle());
        post.setContent(updateDto.getContent());

        return PostToPostDto(postRepository.findById(updateDto.getPostId()).get());
    }

    public boolean deletePost(Long postId) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Could not found post id : " + postId));

        postRepository.delete(post);
        return true;
    }

    public Result getPosts() {
        List<Post> posts = postRepository.findAll();
        List<PostDto> collect = posts.stream()
                .map(p -> new PostDto(p.getMember().getId(), p.getTitle(), p.getContent(), p.getWriter(), p.getLikeCount(), p.getViewCount(), p.getCommentCount()))
                .collect(Collectors.toList());

        return new Result(collect);
    }
}

