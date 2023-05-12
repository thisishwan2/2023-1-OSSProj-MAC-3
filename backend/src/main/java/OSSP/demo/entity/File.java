package OSSP.demo.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    private String s3FileUrl;

    private String fileName;

    @OneToMany(mappedBy = "file", cascade = CascadeType.ALL)
    private List<FileVersion> fileVersionList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;


    @Builder
    public File(String fileName, String s3FileUrl) {
        this.fileName = fileName;
//        this.member = member;
        this.s3FileUrl=s3FileUrl;
    }


//    == 연관관계 편의메서드 ==

    public void setMember(Member member){
        this.member = member;

        if(!member.getFileList().contains(this)){
            member.getFileList().add(this);
        }
    }

    public void addFileVersion(FileVersion fileVersion){
        this.fileVersionList.add(fileVersion);

        if(fileVersion.getFile()!=this){
            fileVersion.setFile(this);
        }
    }
}
