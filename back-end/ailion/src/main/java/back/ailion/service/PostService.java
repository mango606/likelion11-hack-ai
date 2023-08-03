package back.ailion.service;

import back.ailion.model.dto.CommentDto;
import back.ailion.model.dto.CommentReplyDto;
import back.ailion.model.dto.request.PostRequestDto;
import back.ailion.model.dto.request.PostUpdateDto;
import back.ailion.model.entity.Comment;
import back.ailion.model.entity.CommentReply;
import back.ailion.model.entity.Member;
import back.ailion.model.entity.Post;
import back.ailion.model.dto.PostDto;
import back.ailion.repository.MemberRepository;
import back.ailion.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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
                .writer(member.getNickname())
                .commentCount(0)
                .likeCount(0)
                .viewCount(0)
                .delCheck(false)
                .build();

        return PostToPostDto(postRepository.save(post));
    }

    @Transactional
    public PostDto updatePost(PostUpdateDto updateDto) {

        Post post = postRepository.findById(updateDto.getPostId())
                .orElseThrow(() -> new RuntimeException("Could not found post id : " + updateDto.getPostId()));

        post.setTitle(updateDto.getTitle());
        post.setContent(updateDto.getContent());

        return PostToPostDto(postRepository.findById(updateDto.getPostId()).get());
    }

    @Transactional
    public boolean deletePost(Long postId) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Could not found post id : " + postId));

        post.delete();
        return true;
    }

    public PostDto getPost(Long postId) {

        Post post = postRepository.findByIdWithComments(postId);

        return convertPostToDTO(post);
    }

    public Page<Post> getPosts(int page) {
//        List<Post> posts = postRepository.findAll();
//        List<PostDto> collect = posts.stream()
//                .map(p -> new PostDto(p.getMember().getId(), p.getTitle(), p.getContent(), p.getWriter(), p.getLikeCount(), p.getViewCount(), p.getCommentCount(), p.getCreatedDate()))
//                .collect(Collectors.toList());
//
//        return new Result(collect);
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("createdDate"));

        Pageable pageable = PageRequest.of(page, 10, Sort.by(sorts));
        return postRepository.findByDelCheckFalse(pageable);
    }

    private PostDto convertPostToDTO(Post post) {
        PostDto postDTO = new PostDto();
        postDTO.setPostId(post.getId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setWriter(post.getWriter());
        postDTO.setCommentCount(post.getCommentCount());
        postDTO.setLikeCount(post.getLikeCount());
        postDTO.setViewCount(post.getViewCount());
        postDTO.setCreatedDate(post.getCreatedDate());
        postDTO.setComments(convertCommentsToDTOs(post.getComments()));
        postDTO.setMemberId(post.getMember().getId());
        return postDTO;
    }

    private List<CommentDto> convertCommentsToDTOs(List<Comment> comments) {
        List<CommentDto> commentDTOs = new ArrayList<>();
        for (Comment comment : comments) {
            CommentDto commentDTO = new CommentDto();
            commentDTO.setCommentId(comment.getId());
            commentDTO.setContent(comment.getContent());
            commentDTO.setWriter(comment.getWriter());
            commentDTO.setCreatedDate(comment.getCreatedDate());
            commentDTO.setReplies(convertRepliesToDTOs(comment.getCommentReplies()));
            commentDTOs.add(commentDTO);
        }
        return commentDTOs;
    }

    private List<CommentReplyDto> convertRepliesToDTOs(List<CommentReply> replies) {
        List<CommentReplyDto> replyDTOs = new ArrayList<>();
        for (CommentReply reply : replies) {
            CommentReplyDto replyDTO = new CommentReplyDto();
            replyDTO.setReplyId(reply.getId());
            replyDTO.setContent(reply.getContent());
            replyDTO.setWriter(reply.getWriter());
            replyDTO.setCreatedDate(reply.getCreatedDate());
            replyDTOs.add(replyDTO);
        }
        return replyDTOs;
    }
}

