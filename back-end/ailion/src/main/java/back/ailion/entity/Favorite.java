package back.ailion.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Favorite extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id")
    private Long id;

    @JoinColumn(name = "member_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @JoinColumn(name = "ai_info_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private AiInfo aiInfo;

    @Builder
    public Favorite(Member member, AiInfo aiInfo) {
        this.member = member;
        this.aiInfo = aiInfo;
    }
}