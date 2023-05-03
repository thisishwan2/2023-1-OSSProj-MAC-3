package OSSP.demo.entity;

import OSSP.demo.model.FileVersionDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileVersion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileVersionId;

    private String commitMessage;

    @Column(length = 1000)
    private String s3Url;

    @ManyToOne
    @JoinColumn(name = "fileId")
    private File file;

    @Builder
    public FileVersion(String commitMessage, String s3Url, File file){
        this.commitMessage=commitMessage;
        this.s3Url=s3Url;
        this.file=file;
    }

//    // ==연관관계 편의 메서드 ==
//    public void setFile(File file){
//        this.file = file;
//    }
}
