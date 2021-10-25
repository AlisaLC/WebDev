import random
import string

from locust import HttpUser, task


class QuickstartUser(HttpUser):

    def on_start(self):
        self.client.post("/go/sha256", json={"text": "secret-text"})

    def get_random_text(self):
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))

    @task
    def go_text_to_hash_cache(self):
        self.client.post("/go/sha256", json={"text": "mamaliscute"})

    @task
    def go_text_to_hash_no_cache(self):
        self.client.post("/go/sha256", json={"text": self.get_random_text()})

    @task
    def go_hash_to_text_cache(self):
        self.client.get("/go/sha256?hash=a8d283a0698b7e122298d29560a47b8cc8f29f48148add31384d6cd6564942d8")


    @task
    def node_hash_to_text_cache(self):
        self.client.get("/nodejs/sha256?hash=a8d283a0698b7e122298d29560a47b8cc8f29f48148add31384d6cd6564942d8")
    
    @task
    def node_text_to_hash_cache(self):
        self.client.post("/nodejs/sha256", json={"text": "mamaliscute"})
    
    @task
    def node_text_to_hash_no_cache(self):
        self.client.post("/nodejs/sha256", json={"text": self.get_random_text()})
