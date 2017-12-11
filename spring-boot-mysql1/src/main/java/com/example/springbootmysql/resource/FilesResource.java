package com.example.springbootmysql.resource;

import com.example.springbootmysql.model.Files;
import com.example.springbootmysql.repository.FilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/rest/files")
public class FilesResource {

    @Autowired
    FilesRepository filesRepository;

    @GetMapping(value = "/all")
    public List<Files> getAll(){
        return filesRepository.findAll();
    }

    @PostMapping(value = "/load")
    public List <Files> persist(@RequestBody final Files files){
        filesRepository.save(files);
        return filesRepository.findAll();
    }

    @RequestMapping(path="/upload",method = RequestMethod.POST,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ContentLoadResponse fileupload(@RequestParam("file") MultipartFile multipartFile,
                                          @RequestParam("filep") String fileparent,
                                          @RequestParam("email") String userid){

        Content content = new Content();
        Date date = new Date();
        String virtualname= date+"_"+ multipartFile.getOriginalFilename();
        String filepath = UPLOADED_FOLDER + virtualname;
        Response response = new Response();
        ContentLoadResponse contentLoadResponse = new ContentLoadResponse();
        try {
            byte[] bytes = multipartFile.getBytes();
            Path path = Paths.get(filepath);
            java.nio.file.Files.write(path, bytes);
            contentLoadResponse = contentService.UploadFile(multipartFile.getOriginalFilename(),
                    virtualname,Integer.parseInt(fileparent),Integer.parseInt(userid));
        } catch (IOException e) {
            response.setStatus("error");
            response.setMsg("Error in uploading, Please Try Again.");
            contentLoadResponse.setContents(null);
            contentLoadResponse.setResponse(response);
        }
        return contentLoadResponse;
    }
    @RequestMapping(path="/getroot",method = RequestMethod.POST)
    public RootResponse getRoot(@RequestBody User user) {
        // This returns a JSON with the users
        return contentService.getRoot(user);
    }
    @RequestMapping(path="/createfolder",method = RequestMethod.POST)
    public ContentLoadResponse CreateFolder(@RequestBody Folder folder) {
        return contentService.CreateFolder(folder);
    }
    @RequestMapping(path="/getfolderdata",method = RequestMethod.POST)
    public ContentLoadResponse getFolderData(@RequestBody Folder folder) {
        // This returns a JSON with the users
        return contentService.getFolderData(folder);
    }

    public ContentLoadResponse UploadFile(String name, String path, int parentfolderid, int userid ){
        Response response = new Response();
        ContentLoadResponse contentLoadResponse = new ContentLoadResponse();
        Mapping mapping = new Mapping();

        try{
            Date date = new Date();
            Content content = new Content();
            content.setOriginalname(name);
            content.setVirtualname(path);
            content.setStar("NO");
            content.setDate(date.toString());
            content.setUserid(userid);
            content.setType("file");

            content = contentRepository.save(content);
            mapping.setContentid(content.getContentid());
            mapping.setFolderid(parentfolderid);
            mapping.setUserid(userid);
            mappingRepository.save(mapping);
            List<Mapping> mapping2 = mappingRepository.findMappingByFolderidAndUserid(parentfolderid,userid);

            List<Integer> contentid = mapping2.stream().map(mapping1 -> mapping1.getContentid()).collect(Collectors.toList());
            contentRepository.findAllByContentidIn(contentid);
            contentLoadResponse.setContents(contentRepository.findAllByContentidIn(contentid));
            response.setStatus("success");
            response.setMsg("File Successfully uploaded.");
            contentLoadResponse.setResponse(response);
            contentLoadResponse.setParentfolderid(parentfolderid);

        }
        catch (Exception e){
            response.setStatus("error");
            response.setMsg("Error in uploading, Please Try Again.");
            contentLoadResponse.setResponse(response);
            contentLoadResponse.setContents(null);

        }
        return contentLoadResponse;
    }
    public RootResponse getRoot(User user){

        RootResponse rootResponse = new RootResponse();
        Response response = new Response();
        try{

            Content content =  contentRepository.findAllByUseridAndOriginalname(user.getId(),"root");
            rootResponse.setRootid(content.getContentid());
            response.setStatus("success");
            response.setMsg("");
            rootResponse.setResponse(response);

        }
        catch (Exception e){
            rootResponse.setRootid(0);
            response.setStatus("error");
            response.setMsg("Something went wrong.");
            rootResponse.setResponse(response);
        }
        return rootResponse;
    }

    public ContentLoadResponse CreateFolder(Folder folder ){

        Response response = new Response();
        ContentLoadResponse contentLoadResponse = new ContentLoadResponse();
        Mapping mapping = new Mapping();

        try{

            // Add content start
            Date date = new Date();
            Content content = new Content();
            content.setOriginalname(folder.getFoldername());
            content.setVirtualname(folder.getFoldername());
            content.setStar("NO");
            content.setDate(date.toString());
            content.setUserid(folder.getUserid());
            content.setType("folder");

            content = contentRepository.save(content);

            // End

            // Mapping Start

            mapping.setContentid(content.getContentid());
            mapping.setFolderid(folder.getContentid());
            mapping.setUserid(folder.getUserid());
            mappingRepository.save(mapping);

            // Mapping End


            List<Mapping> mapping2 = mappingRepository.findMappingByFolderidAndUserid(folder.getContentid(),folder.getUserid());

            List<Integer> contentid = mapping2.stream().map(mapping1 -> mapping1.getContentid()).collect(Collectors.toList());

            contentRepository.findAllByContentidIn(contentid);

            contentLoadResponse.setContents(contentRepository.findAllByContentidIn(contentid));
            response.setStatus("success");
            response.setMsg("Folder Successfully Created.");
            contentLoadResponse.setResponse(response);
            contentLoadResponse.setParentfolderid(folder.getContentid());

        }
        catch (Exception e){

            response.setStatus("error");
            response.setMsg("Error in uploading, Please Try Again.");
            contentLoadResponse.setResponse(response);
            contentLoadResponse.setContents(null);

        }


        return contentLoadResponse;
    }
    public ContentLoadResponse getFolderData(Folder folder){


        Response response = new Response();
        ContentLoadResponse contentLoadResponse = new ContentLoadResponse();

        try{
            List<Mapping> mapping = mappingRepository.findMappingByFolderidAndUserid(folder.getContentid(),folder.getUserid());

            List<Integer> contentid = mapping.stream().map(mapping1 -> mapping1.getContentid()).collect(Collectors.toList());

            contentRepository.findAllByContentidIn(contentid);
            contentLoadResponse.setContents(contentRepository.findAllByContentidIn(contentid));
            response.setStatus("success");
            response.setMsg("");
            contentLoadResponse.setResponse(response);
            contentLoadResponse.setParentfolderid(folder.getContentid());
        }
        catch (Exception e){

            response.setStatus("error");
            response.setMsg("Something went wrong");
            contentLoadResponse.setResponse(response);
            contentLoadResponse.setContents(null);
        }


        return contentLoadResponse;
    }
}
