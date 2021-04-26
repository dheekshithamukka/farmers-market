package controllers;


import models.Interests;
import models.InterestsRepository;
import play.data.FormFactory;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Controller;
import play.mvc.Result;
import com.fasterxml.jackson.databind.JsonNode;
import utils.EmailUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;
import static play.libs.Json.fromJson;
import static play.libs.Json.toJson;

/**
 * The controller keeps all database operations behind the repository, and uses
 * {@link HttpExecutionContext} to provide access to the
 * {@link play.mvc.Http.Context} methods like {@code request()} and {@code flash()}.
 */
public class InterestsController extends Controller {

    private final InterestsRepository interestsRepository;
    private final HttpExecutionContext ec;
    private final FormFactory formFactory;
    EmailUtil emailUtil;

    @Inject
    public InterestsController(FormFactory formFactory,
                               InterestsRepository interestsRepository,
                               HttpExecutionContext ec) {
        this.formFactory = formFactory;
        this.interestsRepository = interestsRepository;
        this.ec = ec;
    }


    public Result addInterests() {
        JsonNode js = request().body().asJson();
        for (JsonNode interest : js.withArray("interests")) {
            Interests interests = new Interests();
            interests.setUid(js.get("uid").asLong());
            interests.setInterests(interest.asText());
            interestsRepository.add(interests);
        }
        return ok("created");
    }

    public Result updateInterests(){
        JsonNode js = request().body().asJson();
        interestsRepository.deleteInterests(js.get("uid").asLong()).thenApplyAsync(p -> {
            if(p.equals("Successful")) {
                for (JsonNode interest : js.withArray("interests")) {
                    Interests interests = new Interests();
                    interests.setUid(js.get("uid").asLong());
                    interests.setInterests(interest.asText());
                    interestsRepository.add(interests);
                }
            }
            return ok("Successful");
        }, ec.current());
        return ok("Successful");
    }
}