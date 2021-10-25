import random
import string

from locust import HttpUser, task


class QuickstartUser(HttpUser):

    def on_start(self):
        self.randoms = [''.join(random.choices(string.ascii_uppercase + string.digits, k=16)) for i in range(10000)]

    def get_random_text(self):
        for random_test in self.randoms:
            yield random_test

    @task
    def go_hash_to_text_cache(self):
        self.client.get("/go/sha256?hash=be018cef50798b9791bdd64066e9f10388f36d4ab06b1e6891dbfb4e22643fa5")

    @task
    def go_hash_to_text_no_cache(self):
        self.client.get("/go/sha256?hash=be018cef50798b9791bdd64066e9f10388f36d4ab06b1e6891dbfb4e22643fa4")

    @task
    def go_text_to_hash_cache(self):
        self.client.post("/go/sha256", json={"text": "mamaliscute"})

    def go_text_to_hash_no_cache(self):
        self.client.post("/go/sha256", json={"text": self.get_random_text()})

    @task
    def node_hash_to_text_cache(self):
        self.client.get("/nodejs/sha256?hash=be018cef50798b9791bdd64066e9f10388f36d4ab06b1e6891dbfb4e22643fa5")
    
    @task
    def node_hash_to_text_no_cache(self):
        self.client.get("/nodejs/sha256?hash=be018cef50798b9791bdd64066e9f10388f36d4ab06b1e6891dbfb4e22643fa4")
    
    @task
    def node_text_to_hash_cache(self):
        self.client.post("/nodejs/sha256", json={"text": "mamaliscute"})
    
    def node_text_to_hash_no_cache(self):
        text = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
        self.client.post("/nodejs/sha256", json={"text": text})
